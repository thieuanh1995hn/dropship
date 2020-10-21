const service = require('./service')
const axios = require('axios')
const config = require('./config')
const { Ads } = require('./model')
const moment = require('moment')
const fs = require('fs')
let reactToday = ''

async function alertNewBestByOrderToday(time) {
    try {
        let r = await service.bestByOrderToday()
        r.order100 = r.order100.split(',').filter(elm => !!elm)
        r.order50 = r.order50.split(',').filter(elm => !!elm)

        let orderToday = fs.readFileSync('db/orderTodayALL.json', 'utf8');
        if (orderToday) {
            orderToday = JSON.parse(orderToday)
            let _new = fs.readFileSync('db/orderToday.json', 'utf8')
            if (_new) {
                _new = JSON.parse(_new)
            }
            _new = { order100: [], order50: [], ..._new }
            for (let post_id of r.order100) {
                if (!orderToday.order100.includes(post_id)) {
                    _new.order100.push(post_id)
                    _new.order50.filter(elm => elm !== post_id)
                }
            }
            for (let post_id of r.order50) {
                if (!orderToday.order50.includes(post_id)) {
                    _new.order50.push(post_id)
                }
            }
            if (_new.order100.length > 0 || _new.order50.length > 0) {
                // send message to slack
                // await axios.post("https://slack.com/api/chat.postMessage", {
                //     channel: "order",
                //     text: `Sếp ơi ads theo order :point_right: ${_new.join(',')}`,
                //     username: 'Đệ tử ruột',
                //     icon_url: "https://ca.slack-edge.com/T01CH5MVANL-U01BTC2K7L2-0a745d8aaeed-48"
                // }, {
                //     headers: {
                //         "Authorization": config.slackBotAPIkey,
                //         'Content-Type': 'application/json',
                //     }
                // })
                fs.writeFileSync('db/orderToday.json', JSON.stringify(_new));
            }
        }
        fs.writeFileSync('db/orderTodayALL.json', JSON.stringify(r));
        setTimeout(() => alertNewBestByOrderToday(time), time);
    } catch (e) {
        console.error(e.stack)
        setTimeout(() => alertNewBestByOrderToday(time), time);
    }
}

async function alertNewBestByReactToday(time) {
    try {
        let r = await service.bestByReactToday()
        r.react7000 = r.react7000.split(',').filter(elm => !!elm)
        r.react3000 = r.react3000.split(',').filter(elm => !!elm)
        r.react1000 = r.react1000.split(',').filter(elm => !!elm)
        r.react500 = r.react500.split(',').filter(elm => !!elm)
        let reactToday = fs.readFileSync('db/reactTodayALL.json', 'utf8');
        if (reactToday) {
            reactToday = JSON.parse(reactToday)
            _old = [...reactToday.react7000, ...reactToday.react3000, ...reactToday.react1000, ...reactToday.react500]

            let _new = fs.readFileSync('db/reactToday.json', 'utf8')
            if (_new) {
                _new = JSON.parse(_new)
            }
            _new = { react7000: [], react3000: [], react1000: [], react500: [], ..._new }

            for (let post_id of r.react7000) {
                if (!_old.includes(post_id)) {
                    _new.react7000.push(post_id)
                }
            }
            for (let post_id of r.react3000) {
                if (!_old.includes(post_id)) {
                    _new.react3000.push(post_id)
                }
            }
            for (let post_id of r.react1000) {
                if (!_old.includes(post_id)) {
                    _new.react1000.push(post_id)
                }
            }
            for (let post_id of r.react500) {
                if (!_old.includes(post_id)) {
                    _new.react500.push(post_id)
                }
            }
            if (_new.react7000.length > 0 || _new.react3000.length > 0 || _new.react1000.length > 0 || _new.react500.length > 0) {
                fs.writeFileSync('db/reactToday.json', JSON.stringify(_new));
            }
        }
        fs.writeFileSync('db/reactTodayALL.json', JSON.stringify(r));
        setTimeout(() => alertNewBestByReactToday(time), time);
    } catch (e) {
        setTimeout(() => alertNewBestByReactToday(time), time);
    }
}

async function alertNewBestOrderReactToday(time) {
    try {
        let r = await Ads.find({
            orders: {
                $not: {
                    $elemMatch: {
                        statistical_time: { $lt: moment.utc().startOf('day').toDate() }
                    }
                }
            },
            last_order: { $gte: 10 },
            reactions: { $gte: 1000 },
        }, { post_id: 1 })
            .sort({
                reactions: -1
            });
        r = r.map(elm => elm.post_id)
        let orderReactToday = fs.readFileSync('db/orderReactTodayALL.txt', 'utf8');

        if (orderReactToday) {
            orderReactToday = orderReactToday.split(',')
            _new = fs.readFileSync('db/orderReactToday.txt', 'utf8').split(',').filter(elm => !!elm);
            for (let post_id of r) {
                if (!orderReactToday.includes(post_id)) {
                    _new.push(post_id)
                }
            }
            if (_new.length > 0) {
                // send message to slack
                // await axios.post("https://slack.com/api/chat.postMessage", {
                //     channel: "order-react",
                //     text: `Sếp ơi ads theo react và order :point_right: ${_new.join(',')}`,
                //     username: 'Đệ tử ruột',
                //     icon_url: "https://ca.slack-edge.com/T01CH5MVANL-U01BTC2K7L2-0a745d8aaeed-48"
                // }, {
                //     headers: {
                //         "Authorization": config.slackBotAPIkey,
                //         'Content-Type': 'application/json',
                //     }
                // })
                fs.writeFileSync('db/orderReactToday.txt', _new.join(','));
            }
        }
        fs.writeFileSync('db/orderReactTodayALL.txt', r.join(','));
        setTimeout(() => alertNewBestOrderReactToday(time), time);
    } catch (e) {
        console.error(e.stack)
        setTimeout(() => alertNewBestOrderReactToday(time), time);
    }
}

async function alertOver1000react50order(time) {
    try {
        let r = await service.best1000react50order()
        r = r.split(',').filter(elm => !!elm)
        let over1000react50orderAll = fs.readFileSync('db/over1000react50orderALL.txt', 'utf8');
        if (over1000react50orderAll) {
            let _new = fs.readFileSync('db/over1000react50order.txt', 'utf8').split(',').filter(elm => !!elm);
            over1000react50orderAll = over1000react50orderAll.split(',')

            for (let post_id of r) {
                if (!over1000react50orderAll.includes(post_id)) {
                    _new.push(post_id)
                }
            }
            
            if (_new.length > 0) {
                // send message to slack
                // await axios.post("https://slack.com/api/chat.postMessage", {
                //     channel: "1000-50",
                //     text: `Sếp ơi ads 1000-50 :point_right: ${_new.join(',')}`,
                //     username: 'Đệ tử ruột',
                //     icon_url: "https://ca.slack-edge.com/T01CH5MVANL-U01BTC2K7L2-0a745d8aaeed-48"
                // }, {
                //     headers: {
                //         "Authorization": config.slackBotAPIkey,
                //         'Content-Type': 'application/json',
                //     }
                // })
                fs.writeFileSync('db/over1000react50order.txt', _new.join(','));
            }
        }
        fs.writeFileSync('db/over1000react50orderALL.txt', r.join(','));
        setTimeout(() => alertOver1000react50order(time), time);
    }
    catch (e) {
        console.error(e.stack)
        setTimeout(() => alertOver1000react50order(time), time);
    }

}

async function alertBestReactChange(time) {
    try {
        let r = await service.bestReactChange()
        r = r.split(',').filter(elm => !!elm)
        let reactChangeALL = fs.readFileSync('db/reactChangeALL.txt', 'utf8');
        if (reactChangeALL) {
            let _new = fs.readFileSync('db/reactChange.txt', 'utf8').split(',').filter(elm => !!elm);
            reactChangeALL = reactChangeALL.split(',')

            for (let post_id of r) {
                if (!reactChangeALL.includes(post_id)) {
                    _new.push(post_id)
                }
            }
            
            if (_new.length > 0) {
                // send message to slack
                // await axios.post("https://slack.com/api/chat.postMessage", {
                //     channel: "1000-50",
                //     text: `Sếp ơi ads 1000-50 :point_right: ${_new.join(',')}`,
                //     username: 'Đệ tử ruột',
                //     icon_url: "https://ca.slack-edge.com/T01CH5MVANL-U01BTC2K7L2-0a745d8aaeed-48"
                // }, {
                //     headers: {
                //         "Authorization": config.slackBotAPIkey,
                //         'Content-Type': 'application/json',
                //     }
                // })
                fs.writeFileSync('db/reactChange.txt', _new.join(','));
            }
        }
        fs.writeFileSync('db/reactChangeALL.txt', r.join(','));
        setTimeout(() => alertBestReactChange(time), time);
    }
    catch (e) {
        console.error(e.stack)
        setTimeout(() => alertBestReactChange(time), time);
    }

}

async function alertReactCrawlDone(time) {
    try {
        let r = await Ads.find({
            tracking_time_arr: {
                $not: { $elemMatch: { $lt: moment.utc().startOf('day').toDate() } }
            },
            action: { $in: ["SHOP_NOW", "LEARN_MORE", "GET_OFFER"] },
            reactions: { $gte: 7000 },
        }, { post_id: 1 })
            .sort({
                reactions: -1
            });
        r = r.map(elm => elm.post_id).join(',')

        //TODO
        if (reactToday !== r) {
            await axios.post("https://slack.com/api/chat.postMessage", {
                channel: "react",
                text: `Sếp ơi react có rồi ạ!`,
                username: 'Đệ tử ruột',
                icon_url: "https://ca.slack-edge.com/T01CH5MVANL-U01BTC2K7L2-0a745d8aaeed-48"
            }, {
                headers: {
                    "Authorization": config.slackBotAPIkey,
                    'Content-Type': 'application/json',
                }
            })
        }
        reactToday = r
        setTimeout(() => alertReactCrawlDone(time), time);
    } catch (e) {
        console.error(e.stack)
        setTimeout(() => alertReactCrawlDone(time), time);
    }

}


alertNewBestByOrderToday(60000);
alertReactCrawlDone(60000);
alertNewBestOrderReactToday(60000);
alertOver1000react50order(60000);
alertNewBestByReactToday(60000)
alertBestReactChange(60000)