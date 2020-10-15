const service = require('./service')
const axios = require('axios')
const config = require('./config')
const { Ads } = require('./model')
const moment = require('moment')
const fs = require('fs')

let orderToday = null
let reactToday = null
let orderReactToday = null
async function alertNewBestByOrderToday(time) {
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
            if (_new.length > 0) {
                // send message to slack

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
        setTimeout(() => alertNewBestByOrderToday(time), time);
    } catch (e) {
        console.error(e.stack)
        setTimeout(() => alertNewBestByOrderToday(time), time);
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

        if (orderReactToday) {
            _new = []
            for (let post_id of r) {
                if (!orderReactToday.includes(post_id)) {
                    _new.push(post_id)
                }
            }
            if (_new.length > 0) {
                // send message to slack

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
        setTimeout(() => alertNewBestOrderReactToday(time), time);
    } catch (e) {
        console.error(e.stack)
        setTimeout(() => alertNewBestOrderReactToday(time), time);
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

async function alertOver1000react50order(time) {
    try {
        let r = await Ads.find({
            $or: [{ last_yesterday: { $gte: 50 } }, { last_order: { $gte: 50 } }],
            reactions: { $gte: 1000 },
            post_date: {
                $gte: moment.utc().startOf('day').subtract(14, 'days').toDate().getTime() / 1000
                , $lte: moment.utc().startOf('day').toDate().getTime() / 1000
            }
        }, { post_id: 1 })
            .sort({
                reactions: -1
            });
        r = r.map(elm => elm.post_id)
        let over1000react50order = fs.readFileSync('over1000react50order.txt', 'utf8');
        if (over1000react50order) {
            let _new = []
            over1000react50order = over1000react50order.split(',')
            for (let post_id of r) {
                if (!over1000react50order.includes(post_id)) {
                    _new.push(post_id)
                }
            }
            if (_new.length > 0) {
                // send message to slack
                await axios.post("https://slack.com/api/chat.postMessage", {
                    channel: "1000-50",
                    text: `Sếp ơi ads 1000-50 :point_right: ${_new.join(',')}`,
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
        fs.writeFileSync('over1000react50order.txt', r.join(','));
        over1000react50order = r
        setTimeout(() => alertOver1000react50order(time), time);
    }
    catch (e) {
        console.error(e.stack)
        setTimeout(() => alertOver1000react50order(time), time);
    }

}
alertNewBestByOrderToday(1800000);
alertReactCrawlDone(300000);
alertNewBestOrderReactToday(300000);
alertOver1000react50order(300000);