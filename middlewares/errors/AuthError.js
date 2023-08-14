const { AUTH_ERROR_CODE } = require('../../constants/constants');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.message = message || 'Не правильный логин или пароль';
    this.statusCode = AUTH_ERROR_CODE;
  }
}

module.exports = AuthError;
