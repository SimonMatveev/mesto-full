// packages
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
// middlewares
const errorsHandler = require('./middlewares/errors');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// other
const ORIGINS = require('./utils/origins');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cors({
  origin: ORIGINS,
  credentials: true,
}));

app.use('/', require('./routes/main-router'));

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
