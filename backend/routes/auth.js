const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/failure' }), (req, res) => {
  res.redirect('/auth/success');
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth/failure' }), (req, res) => {
  res.redirect('/auth/success');
});

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ user: null });
  });
});

router.get('/user', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

router.get('/failure', (req, res) => {
  res.status(401).json({ error: 'Authentication failed' });
});

router.get('/success', (req, res) => {
  if (req.user) {
    res.send('<h1>Connexion réussie!</h1><p>Vous pouvez maintenant fermer cette fenêtre.</p><script>window.close();</script>');
  } else {
    res.redirect('/auth/failure');
  }
});

module.exports = router;
