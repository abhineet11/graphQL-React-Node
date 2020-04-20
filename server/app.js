const express = require('express');
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/schema')

const app = express();

mongoose.connect('mongodb://abhineet:abhineet123@ds143604.mlab.com:43604/graphql')
mongoose.connection.once('open', () => {
    console.log('connection establised')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('running in port 4000')
})