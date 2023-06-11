const jwt = require('jsonwebtoken');
const InvalidatedToken = require('@/models/invalidated-token');
const { ForbiddenException, UnauthorizedException } = require('@/exceptions');

const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new UnauthorizedException('Missing authorization token'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const result = await InvalidatedToken.findOne({
            where: {
                token,
            },
        })

        if (result) throw new ForbiddenException('Invalid token');

        req.user = decoded;
        req.token = token;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = auth;
