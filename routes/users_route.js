const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken');
const authToken = require('./../auth_token/auth_token');
const { sequelize, Comments, Users, Artocles } = require('../models');
const joi_validation = require('./../joi_validation/joi_validation.js');
const bcrypt = require("bcrypt");
require('dotenv').config();
const axios = require('axios')

route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(authToken);


route.get('/users', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    Users.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json(err))
})

route.get('/users/:id', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    Users.findOne({where: {id: req.params.id} })
        .then(row => res.json(row))
        .catch(err => res.status(500).json(err))
})

route.post('/users', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    axios.post('http://localhost:8082/register', req.body)
        .then(ans => {
            res.json({ token: ans.data.token });
        })
        .catch(err => {
            res.status(500).json(err)
        });
})

route.put('/users/:id', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    const validation = joi_validation.userRegistrationValidation(req.body)
    if(validation.error){
        return res.send({ message: validation.error.details[0].message })
    }

    Users.findOne({ where: { id: req.params.id } })
        .then(user => {
            user.role = req.body.role;
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.username = req.body.username;
            user.email = req.body.email;
            if (req.body.password)
                user.password = bcrypt.hashSync(req.body.password, 10);

            user.save()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err))
})

route.delete('/users/:id', (req, res) => {
    if(req.user.role !== 'ADMIN')
        return res.status(401).json({message:'Unauthorized'})

    Users.findOne({ where: { id: req.params.id } })
        .then(user => {
            user.destroy()
                .then(row => res.json(row))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
})

module.exports = route;