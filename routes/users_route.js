const express = require('express')
const route = express.Router()
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const authToken = require('./../auth_token/auth_token');
const { sequelize, Comments, Users, Artocles } = require('../models');

route.use(express.json());
route.use(express.urlencoded({ extended: true }));
//route.use(authToken);


route.get('/users', (req, res) => {
    console.log(req.user)
})

route.get('/users/:id', (req, res) => {
    console.log('pozdrav!')
})

route.post('/users', (req, res) => {
    console.log('pozdrav!')
})

route.put('/users/:id', (req, res) => {
    console.log('pozdrav!')
})

route.delete('/users/:id', (req, res) => {
    console.log('pozdrav!')
})

module.exports = route;