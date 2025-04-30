const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const axios = require('axios');

// Fonction pour rafraîchir le token
async function refreshAccessToken(refreshToken) {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: refreshToken,
            grant_type: 'refresh_token'
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Erreur lors du rafraîchissement du token :', error.response?.data || error.message);
        throw error;
    }
}

// Fonction pour vérifier l'expiration
async function isTokenExpired(token) {
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
        console.log(response.data);
        return false;
    } catch (error) {
        return error.response?.status === 400;
    }
}

// Ajout des paramètres d'autorisation pour forcer l'obtention du refresh_token
GoogleStrategy.prototype.authorizationParams = function () {
    return {
        access_type: 'offline',
        prompt: 'consent'
    };
};

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
                if (await isTokenExpired(user.googleToken) && user.refreshToken) {
                    user.googleToken = await refreshAccessToken(user.refreshToken);
                }

                if (refreshToken) {
                    user.refreshToken = refreshToken; // stocker si fourni à nouveau
                }

                user.displayName = profile.displayName || user.displayName;
                await user.save();
                return done(null, user);
            }

            // Nouveau user
            const newUser = new User({
                googleId: profile.id,
                displayName: profile.displayName || '',
                email: profile.emails?.[0]?.value || '',
                googleToken: accessToken,
                refreshToken: refreshToken || null
            });

            await newUser.save();
            return done(null, newUser);
        } catch (err) {
            console.error('Erreur utilisateur Google:', err);
            return done(err, null);
        }
    }));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ githubId: profile.id });

            if (user) {
                user.githubToken = accessToken;
                await user.save();
                return done(null, user);
            }

            const newUser = new User({
                githubId: profile.id,
                displayName: profile.displayName || profile.username || '',
                email: profile.emails?.[0]?.value || '',
                githubToken: accessToken
            });

            await newUser.save();
            return done(null, newUser);
        } catch (err) {
            console.error('Erreur utilisateur GitHub:', err);
            return done(err, null);
        }
    }));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user || null);
        } catch (err) {
            done(err, null);
        }
    });
};