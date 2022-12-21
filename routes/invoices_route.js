const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Invoices } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/invoices', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    Invoices.findAll({ include: ['order'] } )
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/invoices/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({include:['order'], message: 'Unauthorized' })

    Invoices.findOne({ include: ['order'], where : {id: req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.post('/invoices', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    const validation = joi_validation.invoiceValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Invoices.create({
        price: req.body.price,
        user_id: req.body.user_id
    })
        .then(row => {
            const invoiceDto = {id: row.id, price: row.price, user_id: row.user_id }
            res.json({comment: invoiceDto})
        })
        .catch(err => res.status(500).json(err))

})

route.put('/invoices/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    const validation = joi_validation.invoiceValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Invoices.findOne({ include: ['order'], where: {id: req.params.id}})
        .then(row => {
            if(req.body.price)
                row.price = req.body.price
            if(req.body.user_id)
                row.user_id = req.body.user_id
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/invoices/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    Invoices.findOne({where: { id: req.params.id } } )
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route