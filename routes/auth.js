const router = require('express').Router();
const { login, logout, createUser } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validations');

router.post('/signin', loginValidation, login);
router.post('/signout', logout);
router.post('/signup', createUserValidation, createUser);

module.exports = router;
