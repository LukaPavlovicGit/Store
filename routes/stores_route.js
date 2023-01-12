const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Stores } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/stores', (req,res) => {
    Stores.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/stores/:id', (req,res) => {
    Stores.findOne({ where: { id: req.params.id } } )
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/stores', (req,res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.storeValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Stores.create({
        location: req.body.location
    })
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err));
})

route.put('/stores/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Stores.findOne({ where: { id: req.params.id } } )
        .then(row => {
            row.location = req.body.location
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/stores/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Stores.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route