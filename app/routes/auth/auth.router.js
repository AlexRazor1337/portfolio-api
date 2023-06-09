const express = require('express');
const { StatusCodes } = require('http-status-codes')

const { validator } = require('@/middleware');

const validation = require('./auth.validation');
const authController = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/signup', validator(validation.signup), (req, res, next) =>
    authController
        .signup(req.body)
        .then((result) => res.status(StatusCodes.OK).send(result))
        .catch(next)
);

authRouter.post('/login', validator(validation.login), (req, res, next) =>
    authController
        .login(req.body)
        .then((result) => res.status(StatusCodes.OK).send(result))
        .catch(next)
);

module.exports = authRouter;
