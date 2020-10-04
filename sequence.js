const service = require('./service')
const axios = require('axios')
const config = require('./config')
const { Ads } = require('./model')
const moment = require('moment')

let orderToday = null
let reactToday = null
let orderReactToday = null

async function alertNewBestByOrderToday() {
    try {
        let r = await service.bestByOrderToday()
        r.order100 = r.order100.split(',')
        r.order50 = r.order50.split(',')
        if (orderToday) {
            _old = [...orderToday.order100, ...orderToday.order50]
            _new = []
            for (let post_id of [...r.order100, ...r.order50]) {
                if (!_old.includes(post_id)) {
                    _new.push(post_id)
                }
            }
            console.log("New > 50 order: ", _new.length)
            if (_new.length > 0) {
                // send message to slack
                console.log("Chay vao day")
                await axios.post("https://slack.com/api/chat.postMessage", {
                    channel: "order",
                    text: `Sếp ơi ads theo order :point_right: ${_new.join(',')}`,
                    username: 'Đệ tử ruột',
                    icon_url: "https://ca.slack-edge.com/T01CH5MVANL-U01BTC2K7L2-0a745d8aaeed-48"
                }, {
                    headers: {
                        "Authorization": config.slackBotAPIkey,
                        'Content-Type': 'application/json',
                    }
                })
            }
        }
        orderToday = r
        setTimeout(alertNewBestByOrderToday, 1800000);
    } catch (e) {
        console.error(e.stack)
        setTimeout(alertNewBestByOrderToday, 1800000);
    }
}

async function alertNewBestOrderReactToday() {
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

        if (orderReactToday) {
            _new = []
            for (let post_id of r) {
                if (!orderReactToday.includes(post_id)) {
                    _new.push(post_id)
                }
            }
            console.log("New > 50 order: ", _new.length)
            if (_new.length > 0) {
                // send message to slack
                console.log("Chay vao day")
                await axios.post("https://slack.com/api/chat.postMessage", {
                    channel: "order-react",
                    text: `Sếp ơi ads theo react và order :point_right: ${_new.join(',')}`,
                    username: 'Đệ tử ruột',
                    icon_url: "https://ca.slack-edge.com/T01CH5MVANL-U01BTC2K7L2-0a745d8aaeed-48"
                }, {
                    headers: {
                        "Authorization": config.slackBotAPIkey,
                        'Content-Type': 'application/json',
                    }
                })
            }
        }
        orderReactToday = r
        setTimeout(alertNewBestOrderReactToday, 1800000);
    } catch (e) {
        console.error(e.stack)
        setTimeout(alertNewBestOrderReactToday, 1800000);
    }
}

async function alertReactCrawlDone() {
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
        setTimeout(alertReactCrawlDone, 1800000);
    } catch (e) {
        console.error(e.stack)
        setTimeout(alertReactCrawlDone, 1800000);
    }

}

alertNewBestByOrderToday();
alertReactCrawlDone();
alertNewBestOrderReactToday();
