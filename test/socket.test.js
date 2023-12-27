const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client'); // libreria para simular un cliente de socket

// describe es una funcion de jest que nos permite agrupar test
describe('Testing Socket.io', () => {
  let io, serverSocket, clientSocket;

  // Antes de empezar a hacer los test, creamos el servidos usando el callback de beforeAll
  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);

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

  // la funcion test recibe como primer parametro el nombre del test y como segundo parametro una funcion que contiene el test que se va a ejecutar
  test('Test event', (done) => {
    clientSocket.on('greeting', (greet) => {
      try {
        expect(greet).toBe('Hello World');
        done();
      } catch (error) {
        done(error);
      } // evita que el test se quede colgado y asi se puede ver el error especifico
    });

    serverSocket.emit('greeting', 'Hello World');
  });

  test('Testing callbacks (acknowledgements)', done => {
    serverSocket.on('bark', callback => {
      callback('woof!'); // se pasa como parametro del callback un sonido y en el callback se verifica que el sonido sea el esperado
    });

    clientSocket.emit('bark', sound => {
      try {
        expect(sound).toBe('woof!');
        done();
      } catch (error) {
        done(error);
      }
    }); // se envia un callback como parametro para que el servidor lo ejecute
  });
});
