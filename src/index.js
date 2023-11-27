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

// namespace por defecto
// io.on('connection', (socket) => {
// });

// declaracion de namespaces
const teachers = io.of('/teachers');
const students = io.of('/students');

teachers.on('connection', socket => {
  console.log(`${socket.id} connected to teachers namespace`);
});

students.on('connection', socket => {
  console.log(`${socket.id} connected to students namespace`);
});

httpServer.listen(3000);