const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer); // crea un servidor de websockets

app.use(express.static(path.join(__dirname, 'views')));

const socketsOnline = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Listening to events: https://socket.io/docs/v4/listening-to-events/
io.on('connection', (socket) => {
  console.log('Clientes conectados: ', io.engine.clientsCount);
  console.log('ID del socket conectado:', socket.id);
  socket.on('disconnect', () => {
    console.log(`El socket ${socket.id} se desconectó`);
  });

  // socket.conn se puede detectar cualquier evento lanzado por el engine.io
  socket.conn.once('upgrade', () => {
    console.log(
      `Hemos pasado de HTTP Long-Polling a ${socket.conn.transport.name}`
    );
  });

  // Emisión de eventos: https://socket.io/docs/v4/emitting-events/
  // Or https://socket.io/docs/v4/emit-cheatsheet/
  // Emisión básica
  // socket.emit('Un nombre bien largo para un evento')
  socket.emit('welcome', 'Bienvenido al servidor de websockets');

  socket.on('server', (data) => {
    console.log(data);
  });

  socketsOnline.push(socket.id);
  // Emisión a todos los sockets conectados (BROADCAST)
  io.emit('everyone', `${socket.id} se ha conectado`);

  // Emisión a un socket en particular
  socket.on('last', message => {
    // const lastSocket = socketsOnline[socketsOnline.length - 1];
    const lastSocket = socketsOnline.at(-1);
    io.to(lastSocket).emit('saludar', message);
  });

  // on, once and off
  socket.emit('on', 'Hello on! Emiting one time');
  socket.emit('on', 'Hello on! Emiting two times');

  socket.emit('once', 'Hello once! Emiting just one time');
  socket.emit('once', 'Hello once! Emiting just one time');

  socket.emit('off', 'Hello off!');
  
  setTimeout(() => {
    socket.emit('off', 'Hello off!');
  }, 3000);
});

httpServer.listen(3000, () => {
  console.log('listening on localhost:3000');
});