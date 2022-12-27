const express = require('express')
const app = express()
const { sequelize } = require('./models')
const cors = require('cors')

let corsOptions = {
    origin: ['http://localhost:8080', 'http://localhost:8082'],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

const users = require('./routes/users_route')
const comments = require('./routes/comments_route')
const articles = require('./routes/articles_route')
const deliveries = require('./routes/deliveries_route')
const categories = require('./routes/categories_route')
const orders = require('./routes/orders_route')
const reclamations = require('./routes/reclamations_route')
const stores = require('./routes/stores_route')

app.use('/admin', users)
app.use('/admin', comments)
app.use('/admin', articles)
app.use('/admin', deliveries)
app.use('/admin', categories)
app.use('/admin', orders)
app.use('/admin', reclamations)
app.use('/admin', stores)


app.listen({ port: 8081 }, async () => {
await sequelize.authenticate()
console.log('Crud server started!')
});