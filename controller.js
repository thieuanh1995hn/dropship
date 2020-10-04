const service = require('./service')

async function bestByOrderToday(req, res) {
    let output = await service.bestByOrderToday()
    res.send(output)
}

async function bestByOrderYesterday(req, res) {
    let output = await service.bestByOrderYesterday()
    res.send(output)
}

async function bestByReactToday(req, res) {
    let output = await service.bestByReactToday()
    res.send(output)
}

async function bestByReactYesterday(req, res) {
    let output = await service.bestByReactYesterday()
    res.send(output)
}

async function bestByOrderReactToday(req, res) {
    let output = await service.bestByOrderReactToday()
    res.send(output)
}

async function bestByOrderReactYesterday(req, res) {
    let output = await service.bestByOrderReactYesterday()
    res.send(output)
}


module.exports = { bestByOrderToday, bestByOrderYesterday, bestByReactToday, bestByReactYesterday, bestByOrderReactToday, bestByOrderReactYesterday }