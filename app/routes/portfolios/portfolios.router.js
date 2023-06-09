const express = require('express');
const { StatusCodes } = require('http-status-codes')

const { auth, validator } = require('@/middleware');

const portfoliosController = require('./portfolios.controller');
const validation = require('./portfolios.validation');

const portfoliosRouter = express.Router();
portfoliosRouter.use(auth);

portfoliosRouter.route('/')
    .get((req, res, next) =>
        portfoliosController
            .getPortfolios(req.user)
            .then((result) => res.status(StatusCodes.OK).send( { data: result } ))
            .catch(next)
        )
    .post(validator(validation.createPortfolio), (req, res, next) =>
        portfoliosController
            .createPortfolio({ ...req.user, ...req.body })
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    )

portfoliosRouter.route('/:id')
    .get(validator(validation.getPortfolio), (req, res, next) =>
        portfoliosController
            .getPortfolio({ ...req.user, portfolioId: req.params.id })
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    )
    .delete(validator(validation.deletePortfolio), (req, res, next) =>
        portfoliosController
            .deletePortfolio({ ...req.user, portfolioId: req.params.id })
            .then((result) => res.status(StatusCodes.OK).send(result))
            .catch(next)
    );

module.exports = portfoliosRouter;
