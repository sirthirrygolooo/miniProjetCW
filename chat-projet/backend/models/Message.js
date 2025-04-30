const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  clientOffset: { type: String, unique: true },
  username: { type: String, default: 'Anonyme' },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
