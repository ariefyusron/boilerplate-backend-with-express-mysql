const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth');
const middleware = require('../middlewares/auth');

router.post('/register', middleware.register, controller.register);

router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
