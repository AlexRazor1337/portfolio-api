const multer = require('multer');
const express = require('express');
const { StatusCodes } = require('http-status-codes')

const { auth, validator } = require('@/middleware');

const imagesController = require('./images.controller');
const validation = require('./images.validation');

const imagesRouter = express.Router();
imagesRouter.use(auth);

imagesRouter.route('/')
    .post(multer().single('image'), (req, res, next) =>
        imagesController
            .uploadImage({ ...req.user, ...req.body, file: req.file })
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    )

imagesRouter.route('/:id')
    .get(validator(validation.getImage), (req, res, next) =>
        imagesController
            .getImage({ ...req.user, imageId: req.params.id })
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    )
    .delete(validator(validation.deleteImage), (req, res, next) =>
        imagesController
            .deleteImage({ ...req.user, imageId: req.params.id })
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    );

module.exports = imagesRouter;
