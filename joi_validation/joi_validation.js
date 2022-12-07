const Joi = require('joi')

function userRegistrationValidation(user){

    const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).max(10).required(),
        last_name: Joi.string().alphanum().min(3).max(10).required(),
        address: Joi.string().alphanum().min(4).required(),
        username: Joi.string().alphanum().min(4).max(10).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().alphanum().min(5).max(15).required(),
        phone_number: Joi.string().alphanum().min(5).max(15)
    })
    return schema.validate(user)
}

function userLoginValidation(user){

    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().alphanum().min(5).max(15).required(),
    })
    return schema.validate(user)
}

function commentValidation(comment){

    const schema = Joi.object().keys({
        article_id: Joi.number().min(1).required(),
        rate: Joi.number().min(1).max(10).required(),
        text: Joi.string().min(1).required(),
        user_id: Joi.number().min(1).required(),
        article_id: Joi.number().min(1).required()
    })
    return schema.validate(comment)
}

function articleValidation(article){

    const schema = Joi.object().keys({
        type: Joi.string().min(3).required(),
        manufacturer: Joi.string().min(3).required(),
        price: Joi.number().min(0).required(),
        number_on_stock: Joi.number().min(0).required()
    })
    return schema.validate(article)
}

function invoiceValidation(invoice){

    const schema = Joi.object().keys({
        price: Joi.number().min(0).required(),
        user_id: Joi.number().min(1).required()
    })
    return schema.validate(invoice)
}

function deliveryValidation(delivery){

    const schema = Joi.object().keys({
        way_of_delivery: Joi.string().min(4).required(),
        address: Joi.string().alphanum().min(4).required(),
        total_price: Joi.number().min(0).required(),
        article_id: Joi.number().min(1).required(),
        user_id: Joi.number().min(1).required()
    })
    return schema.validate(delivery)
}

function categoryValidation(category){

}

function questionValidation(question){

}

module.exports = {
    userRegistrationValidation,
    userLoginValidation,
    commentValidation,
    articleValidation,
    invoiceValidation,
    deliveryValidation,
    categoryValidation,
    questionValidation
}