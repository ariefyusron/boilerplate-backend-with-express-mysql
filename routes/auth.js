var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/register', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
