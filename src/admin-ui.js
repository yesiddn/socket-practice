const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['https://admin.socket.io'],
    credentials: true,
  },
});

instrument(io, {
  // auth: false, // se debe cambiar a true para que se requiera autenticación para acceder a la interfaz de administración
  auth: {
    type: 'basic',
    username: 'admin',
    password: '$2a$10$ptActgRlzR4KUtUsos.Wh.3zCXUvnqLlK8mv2pUhDC4F8mO6z0LKW', // debe estar encriptado, bcrypt
  },
});

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  socket.on('circle position', (position) => {
    // io.emit will send to all clients including the sender
    // io.emit('move circle', position);

    // socket.broadcast.emit will send to all clients except the sender
    socket.broadcast.emit('move circle', position);
  });
});

httpServer.listen(3000);
