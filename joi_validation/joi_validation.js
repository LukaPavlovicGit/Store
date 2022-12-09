const Joi = require('joi')

function userRegistrationValidation(user){

    const schema = Joi.object().keys({
        role: Joi.string(),
        first_name: Joi.string().max(15).required(),
        last_name: Joi.string().max(15).required(),
        address: Joi.string().max(30).required(),
        username: Joi.string().max(20).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().max(20).required(),
        phone_number: Joi.number()
    })
    return schema.validate(user)
}

function userLoginValidation(user){

    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().max(20).required(),
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
        category_id: Joi.number().min(1).required(),
        manufacturer: Joi.string().min(3).required(),
        price: Joi.number().min(0).required(),
        number_on_stock: Joi.number().min(0)
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

function reclamationValidation(reclamation){

}

function storeValidation(store){

}

function voucherValidation(voucher){

}

module.exports = {
    userRegistrationValidation,
    userLoginValidation,
    commentValidation,
    articleValidation,
    invoiceValidation,
    deliveryValidation,
    categoryValidation,
    questionValidation,
    reclamationValidation,
    storeValidation,
    voucherValidation
}