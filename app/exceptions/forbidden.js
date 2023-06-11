const { StatusCodes } = require('http-status-codes');

const Exception = require('./exception');

class ForbiddenException extends Exception {
  constructor(message) {
    super(
      StatusCodes.FORBIDDEN,
      message,
      `${ForbiddenException.name}: ${message}`
    );
  }
}

module.exports = ForbiddenException;
