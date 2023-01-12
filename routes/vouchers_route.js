const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Vouchers } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)

route.get('/vouchers', (req,res) => {
    Vouchers.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/vouchers/:id', (req,res) => {
    Vouchers.findOne({ where: { id: req.params.id } } )
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/vouchers', (req,res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.voucherValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Vouchers.create({
        user_id: req.body.user_id,
        value: req.body.value,
        comment: req.body.comment
    })
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.put('/vouchers/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    const validation = joi_validation.voucherValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Vouchers.findOne({ where: { id: req.params.id } } )
        .then(row => {
            if(req.body.user_id)
                row.user_id = req.body.user_id
            if(req.body.value)
                row.value = req.body.value
            if(req.body.comment)
                row.comment = req.body.comment
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/vouchers/:id', (req, res) => {
    if(req.user.role !== "ADMIN" && req.user.role !== "MODERATOR")
        return res.status(401).json({message: 'Unauthorized'})

    Vouchers.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route