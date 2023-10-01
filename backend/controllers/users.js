const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const DataError = require('../errors/DataError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

function getUser(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Передан некоректный _id.'));
      } else next(err);
    });
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Передан некоректный _id.'));
      } else next(err);
    });
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные при создании пользователя.'));
      } else next(err);
    });
}

function updateUser(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные при создании пользователя.'));
      } else next(err);
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные при обновлении аватара.'));
      } else next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ message: 'Логин прошел успешно!' });
    })
    .catch(next);
}

function logout(req, res, next) {
  try {
    res.clearCookie('jwt');
    res.send({ message: 'Успешно разлогинены!' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUser,
  getCurrentUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
  login,
  logout,
};
