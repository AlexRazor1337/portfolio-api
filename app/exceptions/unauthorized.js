const { StatusCodes } = require('http-status-codes');

const Exception = require('./exception');

class UnauthorizedException extends Exception {
  constructor(message) {
    super(
      StatusCodes.UNAUTHORIZED,
      message,
      `${UnauthorizedException.name}: ${message}`
    );
  }
}

module.exports = UnauthorizedException;
