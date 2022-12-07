const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Reclamations } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/reclamations', (req,res) => {
    Reclamations.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/reclamations/:id', (req,res) => {
    Reclamations.findOne({ where: { id: req.params.id } } )
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/reclamations', (req,res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.questionValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Reclamations.create({
        description: req.body.description,
        user_id: req.body.user_id,
        article_id: req.body.article_id
    })
        .then(row => {
            res.json({reclamation: row})
        })
        .catch(err => res.status(500).json(err));
})

route.put('/reclamations/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.questionValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Reclamations.findOne({ where: { id: req.params.id } } )
        .then(row => {
            row.description = req.body.description
            row.user_id = req.body.user_id
            row.article_id = req.body.article_id
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/reclamations/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Reclamations.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route