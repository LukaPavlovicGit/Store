const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Comments } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/comments', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Comments.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/comments/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Comments.findOne({where : {id: req.params.id}})
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.post('/comments', (req, res) => {
    const validation = joi_validation.commentValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Comments.create({
        user_id: req.user.id,
        article_id: req.body.restaurant_id,
        rate: req.body.rate,
        text: req.body.content,
    })
        .then(row => {
            const commentDto = {user_id: row.user_id, article_id: row.article_id, rate: row.rate, text: row.text}
            res.json({comment: commentDto})
        })
        .catch(err => res.status(500).json(err))

})

route.put('/comments/:id', (req, res) => {
    const validation = joi_validation.commentValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Comments.findOne({where: {id: req.params.id}})
        .then(row => {
            if(req.user.id !== row.user_id)
                return res.status(401).json({message: "User can't updated row if it's not his personal!"})

            row.article_id = req.body.article_id
            row.rate = req.body.rate
            row.text = req.body.text
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/comments/:id', (req, res) => {
    Comments.findOne({where: { id: req.params.id } } )
        .then(row => {
            if(req.user.id !== row.user_id && req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
                return res.status(401).json({message: 'Unauthorized'})

            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route