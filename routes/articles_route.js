const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Articles } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/articles', (req,res) => {
    Articles.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/articles/:id', (req,res) => {
    Articles.findOne({ where: { id: req.params.id } } )
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/articles', (req,res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    const validation = joi_validation.articleValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Articles.create({
        type: req.body.type,
        manufacturer: req.body.manufacturer,
        price: req.body.price,
        number_on_stock: req.body.number_on_stock
    })
        .then(row => {
            const articleDto = {id: row.id, manufacturer: row.manufacturer, price: row.price, number_on_stock: row.number_on_stock}
            res.json({article: articleDto})
        })
        .catch(err => res.status(500).json(err));
})

route.put('/articles/:id', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    const validation = joi_validation.articleValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Articles.findOne({ where: { id: req.params.id } } )
        .then(row => {
            row.type = req.body.type
            row.manufacturer = req.body.manufacturer
            row.price = req.body.price
            row.number_on_stock = req.body.number_on_stock
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/articles/:id', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    Articles.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route