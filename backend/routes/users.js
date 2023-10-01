const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regExpUrl = require('../utils/regexp');
const {
  getUser, getCurrentUser, getUsers, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regExpUrl, { name: 'url' }),
  }),
}), updateAvatar);

module.exports = router;
