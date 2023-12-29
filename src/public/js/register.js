const login = document.querySelector('#login');

login.addEventListener('click', (e) => {
  const user = document.querySelector('#username').value;
  if (user !== '') {
    document.cookie = `username=${user}`;
    document.location.href = '/';
  } else {
    alert('Please enter a username');
    return;
  }

  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      if (res.redirected) {
        window.location.href = res.url;
      } else {
        alert('Login failed');
      }
    })
    .catch((err) => console.log(err));
});
