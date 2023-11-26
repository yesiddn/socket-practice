const socket = io();

const connectRoom1 = document.querySelector('.connect-room1');
const connectRoom2 = document.querySelector('.connect-room2');
const connectRoom3 = document.querySelector('.connect-room3');

connectRoom1.addEventListener('click', () => {
  socket.emit('join room', 'room1');
});

connectRoom2.addEventListener('click', () => {
  socket.emit('join room', 'room2');
});

connectRoom3.addEventListener('click', () => {
  socket.emit('join room', 'room3');
});

const sendMessage = document.querySelector('.send-message');

sendMessage.addEventListener('click', () => {
  const message = prompt('Enter a message');
  socket.emit('send message', message);
});

socket.on('receive message', ({ message, room }) => {
  const li = document.createElement('li');
  li.textContent = message;

  document.querySelector(`#${room}`).appendChild(li);
});