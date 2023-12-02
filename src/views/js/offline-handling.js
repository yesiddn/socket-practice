const socket = io();

const send = document.querySelector('#send');
const disconnect = document.querySelector('#disconnect');
const reconnect = document.querySelector('#reconnect');

send.addEventListener('click', () => {
  // control del buffer, para que no se envien eventos seguidos en caso de desconexion
  // ❌ Mala practica no controlar el buffer
  if (socket.connected) {
    socket.emit('is connected', 'Esta conectado!');
  }
});

disconnect.addEventListener('click', () => {
  socket.disconnect();
});

reconnect.addEventListener('click', () => {
  // al reconectarse envia todos los eventos que no se enviaron por la desconexion
  socket.connect();
});