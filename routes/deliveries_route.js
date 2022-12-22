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

    Deliveries.findAll({ include:['orders'] })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))

})

route.get('/deliveries/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    Deliveries.findOne({ include:['orders'], where : {id: req.params.id} } )
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/deliveries', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    const validation = joi_validation.deliveryValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Deliveries.create({
        delivery_date: req.body.delivery_date
    })
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.put('/deliveries/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({ message: 'Unauthorized' })

    Deliveries.findOne({include:['orders'], where: {id: req.params.id}})
        .then(row => {
            if(req.body.delivery_date)
                row.delivery_date = req.body.delivery_date
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
            if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
                return res.status(401).json({message: 'Unauthorized'})

            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route