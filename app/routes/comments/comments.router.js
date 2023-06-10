const express = require('express');
const { StatusCodes } = require('http-status-codes')

const { auth, validator } = require('@/middleware');

const commentsController = require('./comments.controller');
const validation = require('./comments.validation');

const commentsRouter = express.Router();
commentsRouter.use(auth);

commentsRouter.route('/')
    .post(validator(validation.createComment), (req, res, next) =>
        commentsController
            .createComment({ ...req.user, ...req.body })
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    )

commentsRouter.route('/:id')
    .delete(validator(validation.deleteComment), (req, res, next) =>
        commentsController
            .deleteComment({ ...req.user, commentId: req.params.id })
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    );

module.exports = commentsRouter;
