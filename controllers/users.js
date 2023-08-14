const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const CreateUserError = require('../middlewares/errors/CreateUserError');
const ValidationError = require('../middlewares/errors/ValidationError');
const {
  CREATED_CODE, NODE_ENV, JWT_SECRET, DUBLICATE_ERROR_CODE,
} = require('../constants/constants');

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });
    if (!user) throw new NotFoundError();
    res.send(user);
  } catch (err) { next(err); }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, email,
    } = req.body;
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(CREATED_CODE).send(user.hidePassword());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError());
    }
    if (err.code === DUBLICATE_ERROR_CODE) {
      next(new CreateUserError());
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );
    res.cookie('token', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: NODE_ENV === 'production',
    }).send(user.hidePassword());
  } catch (err) { next(err); }
};

module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token').send({ message: 'Выход' });
  } catch (err) { next(err); }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) throw new NotFoundError();
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError());
    }
    if (err.code === DUBLICATE_ERROR_CODE) {
      next(new CreateUserError());
    }
    next(err);
  }
};
