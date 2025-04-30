const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  displayName: { type: String, required: true },
  email: { type: String, required: false },
  googleToken: { type: String },
  githubToken: { type: String },
  refreshToken: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
