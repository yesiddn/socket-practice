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