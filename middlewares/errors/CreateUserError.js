const { CREATE_USER_ERROR_CODE } = require('../../constants/constants');

class CreateUserError extends Error {
  constructor(message) {
    super(message);
    this.message = message || 'Такой пользователь уже существует';
    this.statusCode = CREATE_USER_ERROR_CODE;
  }
}

module.exports = CreateUserError;
