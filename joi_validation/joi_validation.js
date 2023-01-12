const Joi = require('joi')

function userRegistrationValidation(user){

    const schema = Joi.object().keys({
        role: Joi.string(),
        first_name: Joi.string().max(15).required(),
        last_name: Joi.string().max(15).required(),
        address: Joi.string().max(30).required(),
        username: Joi.string().max(20).required(),
        email: Joi.string().required(),
        password: Joi.string().max(20).required(),
        phone_number: Joi.number()
    })
    return schema.validate(user)
}

function userLoginValidation(user){

    const schema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().max(20).required(),
    })
    return schema.validate(user)
}

function commentValidation(comment){

    const schema = Joi.object().keys({
        article_id: Joi.number().min(1),
        rate: Joi.number().min(1).max(10).required(),
        text: Joi.string().min(1).required()
    })
    return schema.validate(comment)
}

function articleValidation(article){

    const schema = Joi.object().keys({
        category_id: Joi.number().min(1),
        order_id: Joi.number().min(1),
        manufacturer: Joi.string().min(3),
        name: Joi.any(),
        price: Joi.number().min(0)
    })
    return schema.validate(article)
}

function deliveryValidation(delivery){

    const schema = Joi.object().keys({
        delivery_date: Joi.date()
    })
    return schema.validate(delivery)
}

function categoryValidation(category){
    const schema = Joi.object().keys({
        name: Joi.string().required()
    })
    return schema.validate(category)
}

function reclamationValidation(reclamation){
    const schema = Joi.object().keys({
        description: Joi.string().required(),
        user_id: Joi.number().required(),
        article_id: Joi.number().required()
    })
    return schema.validate(reclamation)
}

function storeValidation(store){
    const schema = Joi.object().keys({
        location: Joi.string()
    })
    return schema.validate(store)
}

function voucherValidation(voucher){
    const schema = Joi.object().keys({
        user_id: Joi.number(),
        value: Joi.number(),
        comment: Joi.string()
    })
    return schema.validate(voucher)
}

function orderValidation(order){
    const schema = Joi.object().keys({
        user_id: Joi.number().min(1),
        delivery_id: Joi.number(),
        total_price: Joi.number()
    })
    return schema.validate(order)
}

function questionValidation(question){
    const schema = Joi.object().keys({
        question: Joi.string().required(),
        answer: Joi.string().required()
    })
    return schema.validate(question)
}

module.exports = {
    userRegistrationValidation,
    userLoginValidation,
    commentValidation,
    articleValidation,
    deliveryValidation,
    categoryValidation,
    reclamationValidation,
    storeValidation,
    voucherValidation,
    orderValidation,
    questionValidation
}