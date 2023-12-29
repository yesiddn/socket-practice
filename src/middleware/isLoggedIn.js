module.exports = (req, res, next) => {
  if (req.cookies.username) {
    // genera error porque no existe la cookies, hay que usar un parseador de cookies
    // npm install cookie-parser
    next();
  } else {
    res.redirect('/register');
  }
};
