const Joi = require('joi');

const uploadImage = Joi.object({
    body: Joi.object().keys({
        portfolioId: Joi.number().integer().positive().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
});

const deleteImage = Joi.object({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).required(),
});

const getImage = Joi.object({
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    }).required(),
});

module.exports = {
    uploadImage,
    deleteImage,
    getImage,
}
