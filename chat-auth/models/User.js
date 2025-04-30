const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: String,
    githubId: String,
    displayName: String,
    email: String,
  });  

module.exports = mongoose.model('User', UserSchema);