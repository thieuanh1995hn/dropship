const service = require('./service')
const axios = require('axios')
const config = require('./config')
let orderToday = null

async function alertNewBestByOrderToday() {
    try {
        let r = await service.bestByOrderToday()
        r.order100 = r.order100.split(',')
        r.order50 = r.order50.split(',')
        r.order10 = r.order10.split(',')
        if (orderToday) {
            console.log(r)
            _old = [...orderToday.order100, ...orderToday.order50, ...orderToday.order10]
            _new = []
            for (let post_id of [...r.order100, ...r.order50, ...r.order10]) {
                if (!_old.includes(post_id)) {
                    _new.push(post_id)
                }
            }
            console.log("New best ads by order: ", _new.length)
            if (_new.length > 0) {
                // send message to slack
                console.log("Chay vao day")
                await axios.post("https://slack.com/api/chat.postMessage", {
                    channel: config.slackBotChanel,
                    text: `Sếp ơi có ads xịn xò :point_right: ${_new.join(',')}`,
                    username: 'Đệ tử ruột',
                    "icon_url": "https://ca.slack-edge.com/T01CH5MVANL-U01BTC2K7L2-0a745d8aaeed-48"
                }, {
                    headers: {
                        "Authorization": config.slackBotAPIkey,
                        'Content-Type': 'application/json',
                    }
                })
            }
        }
        orderToday = r
        setTimeout(alertNewBestByOrderToday, 300000);
    } catch (e) {
        console.error(e.stack)
        setTimeout(alertNewBestByOrderToday, 300000);
    }
}

alertNewBestByOrderToday();
