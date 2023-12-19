const socket = io();

const circle = document.querySelector('#circle');

const drawCircle = (position) => {
  circle.style.top = position.y + 'px';
  circle.style.left = position.x + 'px';
};

const drag = (e) => {
  e.preventDefault();

  const position = {
    x: e.clientX || e.touches[0].clientX,
    y: e.clientY || e.touches[0].clientY,
  };

  drawCircle(position);
  // al desconectarse el cliente, todos los demás eventos que ocurran, se guardaran en el buffer y se enviaran cuando el cliente se reconecte, pero en este caso, se enviaran cientos
  // con los eventos volatiles, se evita que se guarden en el buffer y se envien al cliente cuando se reconecte.
  socket.volatile.emit('circle position', position); 
  // Los volatile events son una forma mas elegante que el condicional que usamos en offline-handling
  // con volatile events se evita el golpe masivo de eventos que se envian al servidor cuando el cliente se reconecta
};

circle.addEventListener('mousedown', (e) => {
  document.addEventListener('mousemove', drag);
});

circle.addEventListener('mouseup', (e) => {
  document.removeEventListener('mousemove', drag);
});

circle.addEventListener('touchstart', (e) => {
  circle.addEventListener('touchmove', drag);
});

circle.addEventListener('touchend', (e) => {
  circle.removeEventListener('touchmove', drag);
});

socket.on('move circle', (position) => {
  drawCircle(position);
});
