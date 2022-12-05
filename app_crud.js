const express = require('express')
const app = express()
const { sequelize } = require('./models')
const path = require('path')
const cors = require('cors')

const users = require('./routes/users_route')
const comments = require('./routes/comments_route')
const articles = require('./routes/articles_route')
const invoices = require('./routes/invoices_route')
const deliveries = require('./routes/deliveries_route')


app.use(express.json())
app.use('/admin', users)
app.use('/admin', comments)
app.use('/admin', articles)
app.use('/admin', invoices)
app.use('/admin', deliveries)

console.log(comments)

app.listen({ port: 8081 }, async () => {
await sequelize.authenticate()
console.log('Crud server started!')
});