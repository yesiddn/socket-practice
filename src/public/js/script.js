const socket = io();

const send = document.querySelector('#send-message');
const allMessages = document.querySelector('#all-messages');

send.addEventListener('click', (e) => {
  const message = document.querySelector('#message').value;

  socket.emit('message', message);

  document.querySelector('#message').value = '';
});

socket.on('message', ({ user, message }) => {
  const msg = document.createRange().createContextualFragment(
    /*html*/ `
    <div class="message">
      <div class="image-container">
        <img src="/images/michi.jpeg" alt="Profile phto" />
      </div>

      <div class="message-body">
        <div class="user-info">
          <span class="username">${user}</span>
          <span class="time">Hace 1 segundo</span>

          <p>
            ${message}
          </p>
        </div>
      </div>
    </div>
  `);

  allMessages.appendChild(msg);
});
