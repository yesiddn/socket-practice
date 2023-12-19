const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client'); // libreria para simular un cliente de socket

// describe es una funcion de jest que nos permite agrupar test
describe('Testing Socket.io', () => {
  let io, serverSocket, clientSocket;

  // Antes de empezar a hacer los test, creamos el servidos usando el callback de beforeAll
  beforeAll((done) => {
    const httpServer = createServer();
    const io = new Server(httpServer);

    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);

      // server
      io.on('connection', (socket) => {
        serverSocket = socket;
      });

      // client
      clientSocket.on('connect', done); // done es un callback que se ejecuta cuando se conecta el cliente al servidor y asi se puede empezar a hacer los test
    });
  });

  // Despues de terminar los test, cerramos el servidor usando el callback de afterAll
  afterAll(() => {
    io.close();
    clientSocket.close();
  }); 
});
