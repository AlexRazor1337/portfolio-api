const Joi = require('joi');

const getFeed = Joi.object({
    query: Joi.object().keys({
        offset: Joi.number().integer().positive().optional(),
        limit: Joi.number().integer().positive().optional(),
    }).optional(),
});

module.exports = {
    getFeed,
};
