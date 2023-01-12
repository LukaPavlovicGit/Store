const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Questions } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/questions', (req,res) => {
    Questions.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/questions/:id', (req,res) => {
    Questions.findOne({ where: { id: req.params.id } } )
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/questions', (req,res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.questionValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Questions.create({
        question: req.body.question,
        answer: req.body.answer
    })
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err));
})

route.put('/questions/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Questions.findOne({ where: { id: req.params.id } } )
        .then(row => {
            if(req.body.question)
                row.question = req.body.location
            if(req.body.answer)
                row.answer = req.body.answer
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/questions/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Questions.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route