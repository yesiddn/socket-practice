const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  socket.connectedRoom = '';

  socket.on('join room', (room) => {
    // si no se especifica que un socket se salga de una sala, este socket seguirá recibiendo los mensajes de la sala a la que se conectó
    socket.leave(socket.connectedRoom);

    switch (room) {
      case 'room1':
        socket.join('room1'); // socket.join will join the socket to the specified room, if the room doesn't exist, it will be created
        socket.connectedRoom = 'room1';
        break;
      case 'room2':
        socket.join('room2');
        socket.connectedRoom = 'room2';
        break;
      case 'room3':
        socket.join('room3');
        socket.connectedRoom = 'room3';
        break;
    }
  });

  socket.on('send message', message => {
    // io.to will send to all clients in the specified room
    const room = socket.connectedRoom;

    io.to(socket.connectedRoom).emit('receive message', { message, room });
  });
});

httpServer.listen(3000);
