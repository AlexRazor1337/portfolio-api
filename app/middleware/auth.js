const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const InvalidatedToken = require('@/models/invalidated-token');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new Error('Missing authorization token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        InvalidatedToken.findOne({
            where: {
                token,
            },
        }).then((result) => {
            if (result) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    error: 'Invalid token',
                });
            }

            req.user = decoded;
            req.token = token;
        });
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: 'Invalid token',
        });
    }
}

module.exports = auth;
