const express = require('express');
const { StatusCodes } = require('http-status-codes')

const { auth } = require('@/middleware');

const profileController = require('./profile.controller');

const profileRouter = express.Router();
profileRouter.use(auth);

profileRouter.route('/')
    .get((req, res, next) =>
        profileController
            .getProfile(req.user)
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    )
    .delete((req, res, next) =>
        profileController
            .deleteProfile({ ...req.user, token: req.token })
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    );

module.exports = profileRouter;
