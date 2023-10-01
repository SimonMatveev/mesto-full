const jsonwebtoken = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { jwt } = req.cookies;

  if (!jwt) {
    return next(new AuthError('Необходима авторизация!'));
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new AuthError('Неверный токен!'));
  }

  req.user = payload;
  return next();
}

module.exports = auth;
