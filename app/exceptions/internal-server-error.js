const { StatusCodes } = require('http-status-codes');

const Exception = require('./exception');

class InternalServerErrorException extends Exception {
  constructor(message) {
    super(
      StatusCodes.INTERNAL_SERVER_ERROR,
      message,
      `${InternalServerErrorException.name}: ${message}`
    );
  }
}

module.exports = InternalServerErrorException;
