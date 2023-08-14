const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthError = require('../middlewares/errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.methods.hidePassword = function hidePassword() {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.findUserByCredentials = async function findUser(email, password) {
  let user;
  try {
    user = await this.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthError();
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new AuthError();
    }
  } catch (err) {
    throw new AuthError();
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
