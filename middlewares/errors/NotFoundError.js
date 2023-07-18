const { NOT_FOUND_ERROR_CODE } = require('../../constants/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = message || 'Пользователь не найден';
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

module.exports = NotFoundError;
