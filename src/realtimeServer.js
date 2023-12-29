module.exports = (httpServer) => {
  const { Server } = require('socket.io');
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log(socket.id);

    const cookie = socket.handshake.headers.cookie; // access the cookie sent from the client
    console.log(cookie); // username=yesiddn
    const user = cookie.split('=').pop();
    
    socket.on('message', (message) => {
      io.emit('message', {
        user,
        message
      });
    });
  });
};
