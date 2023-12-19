const socket = io({
  auth: {
    // token: "my-secret-token-1234"
    token: "my-secret-token"
  }
}); // asi se envia un json al servidor con el token de autenticación

// En caso de error en el middleware de autenticación
socket.on('connect_error', (err) => {
  if (err.message === 'unauthorized') {
    console.log('There was an error with the authentication:', err.data.details);
  } else {
    // error de conexión
  }
});