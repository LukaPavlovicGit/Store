const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Deliveries, Users} = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/deliveries', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    Deliveries.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))

})

route.get('/deliveries/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    Deliveries.findOne({where : {id: req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.post('/deliveries', (req, res) => {
    const validation = joi_validation.deliveryValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Deliveries.create({
        way_of_delivery: req.body.way_of_delivery,
        address: req.user.address,
        total_price: req.body.total_price,
        article_id: req.body.article_id,
        user_id: req.user.id
    })
        .then(row => {
            const deliveryDto = {way_of_delivery: row.way_of_delivery, address: row.address, total_price: row.total_price, article_id: row.article_id, user_id: row.user_id }
            res.json({comment: deliveryDto})
        })
        .catch(err => res.status(500).json(err))
})

route.put('/deliveries/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    Deliveries.findOne({where: {id: req.params.id}})
        .then(row => {

            row.way_of_delivery = req.body.way_of_delivery
            row.address = req.body.address
            row.total_price = req.body.total_price
            row.article_id = req.body.article_id
            row.user_id = req.body.user_id
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))

})

route.delete('/deliveries/:id', (req, res) => {
    Users.findOne({ where: { id: req.params.id } })
        .then(row => {
            if(req.user.id !== row.user_id && req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
                return res.status(401).json({message: 'Unauthorized'})

            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})