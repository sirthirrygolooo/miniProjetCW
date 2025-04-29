// server.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const sequelize = require('./db'); 

const { User, createDefaultUser } = require('./models/user');

const app = express();

sequelize.sync()
  .then(async () => {
    console.log("Les tables ont été synchronisées avec succès");
    await createDefaultUser();
  })
  .catch(err => console.error("Erreur de synchronisation des tables:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'eheh',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 1000 * 10 * 10
   }
}));

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false, { message: 'Utilisateur non trouvé' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Mot de passe incorrect' });
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json({ message: 'Utilisateur créé', user: newUser.username });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création de l’utilisateur', error: err });
  }
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, message: 'Connexion réussie', user: user.username });
    });
  })(req, res, next);
});


app.get('/home', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: `Bienvenue ${req.user.username}!` });
  } else {
    res.redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Déconnexion réussie' });
    });
  });
});

app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
