const socket = io();

const circle = document.querySelector('#circle');

const drawCircle = position => {
  circle.style.top = position.y + 'px';
  circle.style.left = position.x + 'px';
}

const drag = e => {
  e.preventDefault();
  
  const position = {
    x: e.clientX || e.touches[0].clientX,
    y: e.clientY || e.touches[0].clientY
  };

  drawCircle(position);
  socket.emit('circle position', position);
}

circle.addEventListener('mousedown', e => {
  document.addEventListener('mousemove', drag);
});

circle.addEventListener('mouseup', e => {
  document.removeEventListener('mousemove', drag);
});

// Eventos táctiles
circle.addEventListener('touchstart', e => {
  circle.addEventListener('touchmove', drag);
});

circle.addEventListener('touchend', e => {
  circle.removeEventListener('touchmove', drag);
});

socket.on('move circle', position => {
  drawCircle(position);
});