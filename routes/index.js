const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../middlewares/errors/NotFoundError');

router.use('/', require('./auth'));

router.use('/', auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
