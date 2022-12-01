const Joi = require('joi')

function userRegistrationValidation(user){

    const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(10).required(),
        last_name: Joi.string().alphanum().min(3).max(10).required(),
        username: Joi.string().alphanum().min(4).max(10).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().alphanum().min(5).max(15).required(),
        phone_number: Joi.string().alphanum().min(5).max(15).required()
    });

    return schema.validate(user)
}

function userLoginValidation(user){

    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().alphanum().min(5).max(15).required(),
    });

    return schema.validate(user)
}

module.exports = { userRegistrationValidation, userLoginValidation}