const { VALIDATION_ERROR_CODE } = require('../../constants/constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.message = message || 'Некорректные данные, введите корректные данные';
    this.statusCode = VALIDATION_ERROR_CODE;
  }
}

module.exports = ValidationError;
