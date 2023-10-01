const { celebrate, Joi } = require('celebrate');
const regExpUrl = require('../utils/regexp');

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExpUrl, { name: 'url' }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
};
