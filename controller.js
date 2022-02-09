const service = require('./service')
const fs = require('fs')
    // Order Today
async function bestByOrderToday(req, res) {
    let output = await service.bestByOrderToday()
    res.send(output)
}

async function checkUnseenOrderToday(req, res) {
    let output = await fs.readFileSync('db/orderToday.json', 'utf-8')
    if (output) {
        output = JSON.parse(output)
        output.order100 = output.order100 ? output.order100.join(",") : ''
        output.order50 = output.order50 ? output.order50.join(",") : ''
    }
    res.send({...output })
}

async function clearUnseenOrderToday(req, res) {
    await fs.truncateSync('db/orderToday.json', 0)
    res.send("Success!")
}

// 1000 react 10 order today
async function bestByOrderReactToday(req, res) {
    let output = await service.bestByOrderReactToday()
    res.send({ result: output })
}

async function checkUnseenOrderReactToday(req, res) {
    let output = await fs.readFileSync('db/orderReactToday.txt', 'utf-8')
    res.send({ result: output })
}

async function clearUnseenOrderReactToday(req, res) {
    await fs.truncateSync('db/orderReactToday.txt', 0)
    res.send("Success!")
}

// Order Yesterday
async function bestByOrderYesterday(req, res) {
    let output = await service.bestByOrderYesterday()
    res.send(output)
}

// 1000react50 order
async function bestByReactToday(req, res) {
    let output = await service.bestByReactToday()
    res.send(output)
}

async function checkUnseenReactToday(req, res) {
    let output = await fs.readFileSync('db/reactToday.json', 'utf-8')
    if (output) {
        output = JSON.parse(output)
        output.react7000 = output.react7000 ? output.react7000.join(",") : ''
        output.react3000 = output.react3000 ? output.react3000.join(",") : ''
        output.react1000 = output.react1000 ? output.react1000.join(",") : ''
        output.react500 = output.react500 ? output.react500.join(",") : ''
    }
    res.send({...output })
}

async function clearUnseenReactToday(req, res) {
    await fs.truncateSync('db/reactToday.json', 0)
    res.send("Success!")
}

// React Yesterday
async function bestByReactYesterday(req, res) {
    let output = await service.bestByReactYesterday()
    res.send(output)
}

async function bestByOrderReactYesterday(req, res) {
    let output = await service.bestByOrderReactYesterday()
    res.send({ result: output })
}

async function get1000react50order(req, res) {
    let output = await fs.readFileSync('db/over1000react50orderALL.txt', 'utf-8') // Nen query DB
    res.send({ result: output })
}
async function checkUnseen1000react50order(req, res) {
    let output = await fs.readFileSync('db/over1000react50order.txt', 'utf-8')
    res.send({ result: output })
}

async function clearUnseen1000react50order(req, res) {
    await fs.truncateSync('db/over1000react50order.txt', 0)
    res.send("Success!")
}


async function bestReactChange(req, res) {
    let output = await service.bestReactChange()
    res.send({ result: output })
}


async function checkUnseenReactChange(req, res) {
    let output = await fs.readFileSync('db/reactChange.txt', 'utf-8')
    res.send({ result: output })
}

async function clearUnseenReactChange(req, res) {
    let output = await fs.truncateSync('db/reactChange.txt', 0)
    res.send({ result: output })
}

module.exports = {
    bestByOrderToday,
    bestByOrderYesterday,
    bestByReactToday,
    bestByReactYesterday,
    bestByOrderReactToday,
    bestByOrderReactYesterday,
    clearUnseen1000react50order,
    checkUnseen1000react50order,
    checkUnseenOrderToday,
    clearUnseenOrderToday,
    checkUnseenOrderReactToday,
    clearUnseenOrderReactToday,
    checkUnseenReactToday,
    clearUnseenReactToday,
    get1000react50order,
    bestReactChange,
    checkUnseenReactChange,
    clearUnseenReactChange
}