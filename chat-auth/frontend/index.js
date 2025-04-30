const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

let messages = [];

io.on('connection', (socket) => {
    console.log('[+] user connected');

    socket.on('private message', (msg, clientOffset) => {
        const timestamp = new Date().toLocaleTimeString();
        const message = { content: msg, username: socket.handshake.auth.username, timestamp };
        messages.push(message);
        io.emit('private message', msg, socket.handshake.auth.username, timestamp);
    });

    socket.on('disconnect', () => {
        console.log('[-] user disconnected');
    });
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.delete('/messages', (req, res) => {
    messages = [];
    io.emit('clear messages');
    res.sendStatus(200);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
