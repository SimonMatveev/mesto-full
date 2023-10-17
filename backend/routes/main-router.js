const router = require('express').Router();
const { logout, login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { validateSignIn, validateSignUp } = require('../middlewares/validate');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.post('/signout', auth, logout);
router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.all('/*', (req, res, next) => next(new NotFoundError('Страницы не существует')));

module.exports = router;
