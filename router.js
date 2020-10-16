const express = require('express')
const app = express()
const controller = require('./controller')

// Order Today
app.get('/order-today', controller.bestByOrderToday)
app.get('/order-today/u', controller.checkUnseenOrderToday)
app.get('/order-today/c', controller.clearUnseenOrderToday)

// 1000 order 10 react today
app.get('/order-react-today', controller.bestByOrderReactToday)
app.get('/order-react-today/u', controller.checkUnseenOrderReactToday)
app.get('/order-react-today/c', controller.clearUnseenOrderReactToday)

// Order Yesterday
app.get('/order-yesterday', controller.bestByOrderYesterday)


// React Today
app.get('/react-today', controller.bestByReactToday)
app.get('/react-today/u', controller.checkUnseenReactToday)
app.get('/react-today/c', controller.clearUnseenReactToday)

// React Yesterday
app.get('/react-yesterday', controller.bestByReactYesterday)

// 1000 order 10 react yesterday
app.get('/order-react-yesterday', controller.bestByOrderReactYesterday)

// 1000 react 50 order in 3 weeks
app.get('/1000react50order',controller.get1000react50order)
app.get('/1000react50order/u',controller.checkUnseen1000react50order)
app.get('/1000react50order/c',controller.clearUnseen1000react50order)

module.exports = { app }