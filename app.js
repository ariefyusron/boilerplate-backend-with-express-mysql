require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser');
const validator = require('express-validator');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');

const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use((req,res,next) => {
  req.jwt = jwt
  req.secretKey = process.env.JWT_SECRET_KEY
  req.bcrypt = bcrypt
  req.saltRounds = saltRounds
  next()
});
app.use(validator());

app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/profile', authMiddleware.checkAuth, profileRouter);

module.exports = app;
