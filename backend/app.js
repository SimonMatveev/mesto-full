const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errors');
const NotFoundError = require('./errors/NotFoundError');
const limiter = require('./middlewares/limiter');
const { validateSignUp, validateSignIn } = require('./middlewares/validate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(cors({
  origin: ['https://simonmatveev.students.nomoredomainsrocks.ru', 'http://simonmatveev.students.nomoredomainsrocks.ru', 'localhost:3000'],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);
app.post('/signout', auth, logout);
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.all('*', (req, res, next) => next(new NotFoundError('Страницы не существует')));

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
