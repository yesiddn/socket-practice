const express = require('express');
const router = express.Router();
const path = require('node:path');

const views = path.join(__dirname, '../views');

const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => {
  res.sendFile(path.join(views, '/index.html'));
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(views, '/register.html'));
});

module.exports = router;