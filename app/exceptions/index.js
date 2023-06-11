const NotFoundException = require('./not-found');
const ForbiddenException = require('./forbidden');
const BadRequestException = require('./bad-request');
const UnauthorizedException = require('./unauthorized');
const InternalServerErrorException = require('./internal-server-error');

module.exports = {
    NotFoundException,
    ForbiddenException,
    BadRequestException,
    UnauthorizedException,
    InternalServerErrorException,
};
