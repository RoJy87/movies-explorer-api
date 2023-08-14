const { FORBIDDEN_ERROR_CODE } = require('../../constants/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.message = message || 'Нет доступа к фильму';
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

module.exports = ForbiddenError;
