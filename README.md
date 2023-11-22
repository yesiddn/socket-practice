# socket-practice

## Emitting and Receiving Events

### Eventos del servidor

- socket.emit(/*..*/) → Emisión básica.

- socket.broadcast.emit(/*..*/) → A todos los clientes del espacio de nombres actual, exceptuando al remitente.

- socket.to('room1').emit(/*..*/) → A todos los clientes en room1, excepto al remitente.

- socket.to(['room1', 'room2']).emit(/*..*/) → A todos los clientes en room1 y/o room2, excepto al remitente.

- socket.compress(false).emit(/*..*/) → Sin compresión.

- socket.volatile.emit(/*..*/) → Un mensaje que podría eliminarse si el transporte de bajo nivel no se puede escribir.

- socket.emit("question", (answer) => {*...*}); → Con reconocimiento.

- Con timeout cuando el receptor no recibió el evento en el tiempo esperado.

socket.timeout(5000).emit("my-event", (err) => {
  if (err) {
    // the other side did not acknowledge the event in the given delay
  }
});

- io.in('room1').emit(/*..*/) → A todos los clientes en room1.

- io.to(['room1', 'room2']).except('room3').emit(/*..*/) → A todos los clientes en room1 y/o room2, excepto aquellos en room3.

- io.of('myNamespace').emit(/*..*/) → A todos los clientes en el espacio de nombres “myNamespace”.

- io.of('myNamespace').to('room1').emit(/*..*/) → A todos los clientes en room1 en el espacio de nombres “myNamespace”.

- io.to(socketId).emit(/*..*/) → A un socket en particular por su ID (mensaje privado).

- io.local.emit(/*..*/) → A todos los clientes en este nodo (cuando se tienen múltiples nodos).

- io.emit(/*..*/) → A todos los clientes conectados.

### Eventos del cliente

- socket.emit(/*...*/) → Emisión básica.
  
- socket.emit("question", (answer) => {*...*}); → Con reconocimiento.

- socket.compress(false).emit(/*...*/) → Sin compresión.

- socket.volatile.emit(/*...*/) → Un mensaje que podría eliminarse si el transporte de bajo nivel no se puede escribir.

Con timeout cuando el receptor no recibió el evento en el tiempo esperado.

## On, Once y Off

- On → Se usa para detectar (o escuchar) un evento varias veces.
- Once → Se usa para detectar (o escuchar) un evento una sola vez. Sin importar si el evento se emite varias veces.
- Off → Se usa para dejar de escuchar un evento, sin importar que este se siga emitiendo.

> 💡 El listener del evento no debe ser una función anónima, sino una función nombrada.
