const express = require('express');
const app = express();
const { sequelize } = require('./models');
const path = require('path');
const cors = require('cors');

const users = require('./routes/users_route');
//const restaurants = require('./routes/restaurants_route');
//const foods = require('./routes/foods_route');
const comments = require('./routes/comments_route');

app.use(express.json());
app.use('/admin', users);
app.use('/admin', comments);

console.log(comments)

app.listen({ port: 8081 }, async () => {
    await sequelize.authenticate();
    console.log('Crud server started!');
});