const socket = io();

function checkSocketStatus() {
  console.log('Estado del socket: ', socket.connected); // true o false
}

// Lista de eventos de Socket.io: https://ajaxhispano.com/ask/lista-de-socketio-eventos-70239/
// Listening to events: https://socket.io/docs/v4/listening-to-events/
socket.on('connect', () => {
  console.log('Conectado al servidor: ', socket.id); // id del socket
  checkSocketStatus();
});

socket.on('connect_error', (err) => {
  console.log('Error de conexión');
  checkSocketStatus();
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor: ', socket.id); // undefined porque ya no está conectado
  checkSocketStatus();
});

socket.io.on('reconnect_attempt', () => { // una vez que se desconecta, hay que ingresar al engine mediante io
  console.log('Intentando reconectar...');
});

socket.io.on('reconnect', () => {
  console.log('Reconectado al servidor');
  checkSocketStatus();
});

// Receiving events: https://socket.io/docs/v4/receiving-events/
socket.on('welcome', (msg) => {
  text.textContent = msg;
});

const emitToServer = document.querySelector('#emit-to-server');
emitToServer.addEventListener('click', () => {
  socket.emit('server', 'Hola, servidor');
});

socket.on('everyone', (msg) => {
  console.log(msg);
});

const emitToLast = document.querySelector('#emit-to-last');
emitToLast.addEventListener('click', () => {
  socket.emit('last', 'Hola, último socket');
});

socket.on('saludar', message => {
  console.log(message);
});

// on, once and off
socket.on('on', message => {
  console.log(message);
});

socket.once('once', message => {
  console.log(message);
});

const listener = () => {
  console.log('Hello off! Turn off this listener');
}

// solo se puede si la función es nombrada
socket.on('off', listener);

setTimeout(() => {
  socket.off('off', listener);
}, 2000);