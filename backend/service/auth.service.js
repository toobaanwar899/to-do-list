const Joi = require('joi');

module.exports = {
    validateSignup: (data) => {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
        return schema.validate(data, { abortEarly: false });
    },
    validateLogin: (data) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });
        return schema.validate(data, { abortEarly: false });
    },
};
