const express = require('express');
const router = express.Router();

const controller = require('../controllers/profile');

/* GET users listing. */
router.get('/', controller.showUser);

module.exports = router;
