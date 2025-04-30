require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const { createServer } = require('http');
const { Server } = require('socket.io');
const sharedSession = require('express-socket.io-session');
const Message = require('./models/Message');

const authRoutes = require('./routes/auth');
require('./config/passport')(passport);

const app = express();
const server = createServer(app);

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'ohoh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
  },
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ user: req.user || null });
});

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5001', process.env.FRONTEND_URL],
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

io.use(sharedSession(sessionMiddleware, {
  autoSave: true
}));

io.on('connection', (socket) => {
  const userId = socket.handshake?.session?.passport?.user;

  if (!userId) {
    console.log('Rejected socket (not authenticated)');
    socket.disconnect();
    return;
  }

  console.log(`WebSocket connecté: ${userId}`);

  socket.on('chat message', async (msg) => {
    try {
      const newMessage = new Message({
        user: userId,
        message: msg,
      });
      await newMessage.save();

      const messages = await Message.find().populate('user', 'displayName').sort({ timestamp: 1 });

      io.emit('chat message', {
        messages,
      });
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));