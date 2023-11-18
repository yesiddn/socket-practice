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