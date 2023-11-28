const user = prompt('Please enter your username');

const profes = ['RetaxMaster', 'juandc', 'gndx'];

let socketNamespace, group;

const chat = document.querySelector('#chat');
const namesapace = document.querySelector('#namespace');

if (profes.includes(user)) {
  // si se pone `const socket = io();` se estaria conectando al namespace por defecto 
  socketNamespace = io('/teachers');
  group = 'teachers';
} else {
  socketNamespace = io('/students');
  group = 'students';
}

socketNamespace.on('connect', () => {
  namesapace.textContent = group;
});

// logica de envio de mensajes
const sendMessage = document.querySelector('#send-message');
sendMessage.addEventListener('click', (e) => {
  const message = prompt('Please enter your message');

  socketNamespace.emit('send message', {
    message,
    user
  })
});

socketNamespace.on('message', data => {
  const { user, message } = data;

  const li = document.createElement('li');
  li.textContent = `${user}: ${message}`;

  chat.appendChild(li);
});