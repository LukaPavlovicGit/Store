const express = require('express')
const route = express.Router()
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const authToken = require('./../auth_token/auth_token');

route.use(express.json());
route.use(express.urlencoded({ extended: true }));