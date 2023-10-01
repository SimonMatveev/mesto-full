function errorsHandler(err, req, res, next) {
  if (err.code === 11000) {
    res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован' });
  } else res.status(err.status || 500).send({ message: err.message });
  next();
}

module.exports = errorsHandler;
