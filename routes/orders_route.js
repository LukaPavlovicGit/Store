const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Orders } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/orders', (req,res) => {
    Orders.findAll({ include: ['articles'] } )
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/orders/:id', (req,res) => {
    Orders.findOne({ include: ['articles'], where: { id: req.params.id } } )
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/orders', (req,res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.articleValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Orders.create({
        user_id: req.body.user_id,
        total_price: req.body.total_price
    })
        .then(row => {
            res.json({article: row})
        })
        .catch(err => res.status(500).json(err));
})

route.put('/orders/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.articleValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Orders.findOne({ include: ['articles'], where: { id: req.params.id } } )
        .then(row => {
            if(req.body.user_id)
                row.user_id = req.body.user_id
            if(req.body.total_price)
                row.total_price = req.body.total_price
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/orders/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Orders.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route