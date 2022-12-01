const express = require('express')
const route = express.Router()
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const authToken = require('./../auth_token/auth_token');
const { sequelize, Comments, Users, Artocles } = require('../models');

route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(authToken);

route.post('/comments', (req, res) => {
    console.log('pozdrav!')
})

module.exports = route;