const express = require('express')
const route = express.Router()
const authToken = require('./../auth_token/auth_token')
const { Users } = require('../models')
const joi_validation = require('./../joi_validation/joi_validation.js')
const bcrypt = require("bcrypt")
require('dotenv').config()
const axios = require('axios')

route.use(express.json())
route.use(express.urlencoded({ extended: true }))
route.use(authToken)


route.get('/users', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})
    Users.findAll({ include: ['comments','invoices','orders','reclamations','vouchers'] } )
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/users/:id', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})
    Users.findOne({ include: ['comments','invoices','orders','reclamations','vouchers'], where: {id: req.params.id} })
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/users', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})
    axios.post('http://localhost:8082/register', req.body)
        .then(ans => {
            res.json({ user: ans.data.user })
        })
        .catch(err => {
            res.status(500).json(err)
        });
})

route.put('/users/:id', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    const validation = joi_validation.userRegistrationValidation(req.body)
    if(validation.error)
        return res.send({ message: validation.error.details[0].message })

    Users.findOne({ include: ['comments','invoices','orders','reclamations','vouchers'], where: { id: req.params.id } })
        .then(row => {
            if(req.body.role)
                row.role = req.body.role
            if(req.body.first_name)
                row.first_name = req.body.first_name
            if(req.body.last_name)
                row.last_name = req.body.last_name
            if(req.body.address)
                row.address = req.body.address
            if(req.body.username)
                row.username = req.body.username
            if(req.body.email)
                row.email = req.body.email
            if(req.body.phone_number)
                row.phone_number = req.body.phone_number
            if (req.body.password)
                row.password = bcrypt.hashSync(req.body.password, 10)
            row.updatedAt = new Date()

            row.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/users/:id', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    Users.findOne({ where: { id: req.params.id } })
        .then(row => {
            row.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))
})

module.exports = route