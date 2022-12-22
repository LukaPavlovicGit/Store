const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Categories } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/categories', (req,res) => {
    Categories.findAll({ include: ['articles'] } )
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/categories/:id', (req,res) => {
    Categories.findOne({ include: ['articles'], where: { id: req.params.id } } )
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/categories', (req,res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.categoryValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Categories.create({
        name: req.body.name
    })
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err));
})

route.put('/categories/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.categoryValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Categories.findOne({ include: ['articles'], where: { id: req.params.id } } )
        .then(row => {
            if(req.body.name)
                row.name = req.body.name
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/categories/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Categories.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route