const Message = require('../models/Message');

module.exports = function(io) {
  io.on('connection', async (socket) => {
    const username = socket.handshake.auth.username || 'Anonyme';

    console.log(`[+] ${username} connected`);
    io.emit('status message', `✅ ${username} est connecté !`, 'green');

    socket.on('disconnect', () => {
      console.log(`[-] ${username} disconnected`);
      io.emit('status message', `❌ ${username} s'est déconnecté.`, 'red');
    });

    socket.on('chat message', async (msg, clientOffset, callback) => {
      const timestamp = new Date().toLocaleTimeString();

      try {
        await Message.create({ content: msg, clientOffset, username, timestamp });
      } catch (e) {
        if (e.code === 11000) {
          callback();
        }
        return;
      }

      io.emit('chat message', msg, username, timestamp);
      callback();
    });
  });
};
