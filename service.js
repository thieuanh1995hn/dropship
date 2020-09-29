const { Ads } = require('./model')
const moment = require('moment')
const fs = require('fs')
// moment.utc().startOf('day')
async function bestByOrderToday() {
    let results = await Ads.find({
        orders: {
            $not: {
                $elemMatch: {
                    statistical_time: { $lt: moment.utc().startOf('day').toDate() }
                }
            }
        },
        last_order: { $lt: 9999, $gte: 100 },
    }, { post_id: 1 })
        .sort({
            last_order: -1
        });
    console.log("bestByOrderToday Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByOrderToday.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
    return results

}

module.exports = { bestByOrderToday }