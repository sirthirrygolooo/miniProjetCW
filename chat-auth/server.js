require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const authRoutes = require('./routes/auth');
require('./config/passport')(passport);

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'ohoh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    if (req.user) {
      res.send(`Hello, ${req.user.displayName} <a href="/auth/logout">Logout</a>`);
    } else {
      res.send('Not logged in <a href="/auth/google">Login with Google</a> <a href="/auth/github">Login with GitHub</a>');
    }
});  

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));