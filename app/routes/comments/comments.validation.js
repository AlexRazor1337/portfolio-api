const Joi = require('joi');

const createComment = Joi.object({
    body: Joi.object().keys({
        text: Joi.string().required(),
        imageId: Joi.number().integer().positive().required(),
    }).required(),
});

const deleteComment = Joi.object({
    params: Joi.object().keys({
        id: Joi.number().required(),
    }).required(),
});

module.exports = {
    createComment,
    deleteComment,
}
