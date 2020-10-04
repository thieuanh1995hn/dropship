const express = require('express')
const app = express()
const controller = require('./controller')

app.get('/order-today', controller.bestByOrderToday)

app.get('/order-yesterday', controller.bestByOrderYesterday)

app.get('/react-today', controller.bestByReactToday)

app.get('/react-yesterday', controller.bestByReactYesterday)

app.get('/order-react-today', controller.bestByOrderReactToday)

app.get('/order-react-yesterday', controller.bestByOrderReactYesterday)

module.exports = { app }