const Joi = require('joi');

const signup = Joi.object({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
        .messages({ 'any.only': 'Passwords do not match' }),
    }).required(),
});

const login = Joi.object({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).required(),
});

module.exports = {
    signup,
    login,
};
