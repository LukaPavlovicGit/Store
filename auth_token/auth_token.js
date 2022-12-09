const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function (req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ message: "Token doesn't exist" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: err });
        }
        req.user = user;
        next();
    });
}