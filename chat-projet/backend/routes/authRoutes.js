const express = require('express');
const { googleAuth, googleAuthCallback, githubAuth, githubAuthCallback, logout } = require('../controllers/authController');
const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);
router.get('/github', githubAuth);
router.get('/github/callback', githubAuthCallback);
router.get('/logout', logout);

module.exports = router;
