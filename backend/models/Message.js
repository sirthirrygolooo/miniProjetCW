const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  clientOffset: {
    type: Number,
    default: () => Math.floor(Math.random() * 1000000),
    unique: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
