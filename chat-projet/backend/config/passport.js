const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        user.googleToken = accessToken;
        user.refreshToken = refreshToken;
        user.displayName = profile.displayName || user.displayName;
        await user.save();
        return done(null, user);
      }

      user = new User({
        googleId: profile.id,
        displayName: profile.displayName || '',
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
        googleToken: accessToken,
        refreshToken: refreshToken
      });

      await user.save();
      return done(null, user);
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur Google:", err);
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

      user = new User({
        githubId: profile.id,
        displayName: profile.displayName || profile.username || '',
        email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
        githubToken: accessToken
      });

      await user.save();
      return done(null, user);
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur GitHub:", err);
      return done(err, null);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) return done(new Error("Utilisateur non trouvé"), null);
      done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
};
