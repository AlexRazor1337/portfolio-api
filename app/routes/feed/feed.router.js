const express = require('express');
const { StatusCodes } = require('http-status-codes')

const { auth, validator } = require('@/middleware');

const feedController = require('./feed.controller');
const validation = require('./feed.validation');

const feedRouter = express.Router();
feedRouter.use(auth);

feedRouter.route('/')
    .get(validator(validation.getFeed), (req, res, next) =>
        feedController
            .getFeed(req.query)
            .then((result) => res.status(StatusCodes.OK).send( { data: result } ))
            .catch(next)
        )


module.exports = feedRouter;
