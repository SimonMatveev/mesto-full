const { celebrate, Joi } = require('celebrate');
const REG_EXP_URL = require('../utils/regexp');

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REG_EXP_URL, { name: 'url' }),
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
