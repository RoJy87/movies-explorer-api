const { SERVER_ERROR_CODE } = require('../../constants/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR_CODE ? 'На сервере произошла ошибка!!!' : message,
  });
  next();
};
