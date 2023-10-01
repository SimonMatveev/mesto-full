const DataError = require('../errors/DataError');
const NotFoundError = require('../errors/NotFoundError');
const DelError = require('../errors/DelError');
const Card = require('../models/card');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточки с переданным _id не существует.');
      if (card.owner.toString() !== req.user._id) throw new DelError('Карточка не ваша!');
      Card.deleteOne(card)
        .then(() => {
          res.send({ data: card });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные для удаления карточки.'));
      } else if (err.name === 'CastError') {
        next(new DataError('Передан некорректный _id карточки.'));
      } else next(err);
    });
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с переданным _id не существует.');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные для постановки лайка.'));
      } else if (err.name === 'CastError') {
        next(new DataError('Передан некорректный _id карточки.'));
      } else next(err);
    });
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с переданным _id не существует.');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные для удаления лайка.'));
      } else if (err.name === 'CastError') {
        next(new DataError('Передан некорректный _id карточки.'));
      } else next(err);
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
