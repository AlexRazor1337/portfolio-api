const { StatusCodes } = require('http-status-codes');

const Exception = require('./exception');

class NotFoundException extends Exception {
  constructor(message) {
    super(
      StatusCodes.NOT_FOUND,
      message,
      `${NotFoundException.name}: ${message}`
    );
  }
}

module.exports = NotFoundException;
