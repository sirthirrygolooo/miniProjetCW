const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const { createClient } = require('redis');
// const RedisStore = require('connect-redis');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./config/passport')(passport);

const app = express();
const server = createServer(app);
const io = new Server(server);

// Configuration de Redis
// const redisClient = createClient({
//   legacyMode: true,
//   url: process.env.REDIS_URL
// });

// redisClient.connect().catch(console.error);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  // store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);

// Serveur statique pour Vue.js
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Gestion du chat en temps réel
require('./utils/socket')(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
