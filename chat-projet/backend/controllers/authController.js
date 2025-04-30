const passport = require('passport');

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/'
});

exports.githubAuth = passport.authenticate('github', { scope: ['user:email'] });

exports.githubAuthCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/'
});

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};
