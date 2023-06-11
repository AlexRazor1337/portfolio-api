const { StatusCodes } = require('http-status-codes');

const Exception = require('./exception');

class BadRequestException extends Exception {
  constructor(message) {
    super(
      StatusCodes.BAD_REQUEST,
      message,
      `${BadRequestException.name}: ${message}`
    );
  }
}

module.exports = BadRequestException;
