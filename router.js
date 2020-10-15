const express = require('express')
const app = express()
const controller = require('./controller')

// Order Today
app.get('/order-today', controller.bestByOrderToday)
app.get('/order-today/unseen', controller.checkUnseenOrderToday)
app.get('/order-today/clear', controller.clearUnseenOrderToday)

// 1000 order 10 react today
app.get('/order-react-today', controller.bestByOrderReactToday)
app.get('/order-react-today/unseen', controller.checkUnseenOrderReactToday)
app.get('/order-react-today/clear', controller.clearUnseenOrderReactToday)

// Order Yesterday
app.get('/order-yesterday', controller.bestByOrderYesterday)


// React Today
app.get('/react-today', controller.bestByReactToday)
app.get('/react-today/unseen', controller.checkUnseenReactToday)
app.get('/react-today/clear', controller.clearUnseenReactToday)

// React Yesterday
app.get('/react-yesterday', controller.bestByReactYesterday)

// 1000 order 10 react yesterday
app.get('/order-react-yesterday', controller.bestByOrderReactYesterday)

// 1000 react 50 order in 3 weeks
app.get('/1000react50order/clear',controller.clearUnseen1000react50order)
app.get('/1000react50order/unseen',controller.checkUnseen1000react50order)

module.exports = { app }