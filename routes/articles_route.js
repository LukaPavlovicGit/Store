const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Articles } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/articles', (req,res) => {
    Articles.findAll({ include: ['comments'] } )
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/articles/:id', (req,res) => {
    Articles.findOne({ include : ['comments'], where: { id: req.params.id } })
        .then(row => {
            res.json(row)
        })
        .catch(err => res.status(500).json(err))
})

route.post('/articles', (req,res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.articleValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Articles.create({
        category_id: req.body.category_id,
        manufacturer: req.body.manufacturer,
        name: req.body.name,
        price: req.body.price
    })
        .then(row => {
            res.json({article: row})
        })
        .catch(err => res.status(500).json(err));
})

route.put('/articles/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.articleValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Articles.findOne({ include : ['comments'], where: { id: req.params.id } } )
        .then(row => {
            if(req.body.category_id)
                row.category_id = req.body.category_id
            if(req.body.order_id)
                row.order_id = req.body.order_id
            if(req.body.manufacturer)
                row.manufacturer = req.body.manufacturer
            if(req.body.name)
                row.name = req.body.name
            if(req.body.price)
                row.price = req.body.price
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/articles/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Articles.findOne({ include : ['comments'], where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route