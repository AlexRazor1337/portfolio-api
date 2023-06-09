const Joi = require('joi');

const createPortfolio = Joi.object({
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
});

const deletePortfolio = Joi.object({
    params: Joi.object().keys({
        id: Joi.number().required(),
    }).required(),
});

const getPortfolio = Joi.object({
    params: Joi.object().keys({
        id: Joi.number().required(),
    }).required(),
});

module.exports = {
    createPortfolio,
    deletePortfolio,
    getPortfolio,
}
