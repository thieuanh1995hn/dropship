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
    console.log("Best By Order Today 100 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByOrderToday100.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
    results = await Ads.find({
        orders: {
            $not: {
                $elemMatch: {
                    statistical_time: { $lt: moment.utc().startOf('day').toDate() }
                }
            }
        },
        last_order: { $lt: 100, $gte: 50 },
    }, { post_id: 1 })
        .sort({
            last_order: -1
        });
    console.log("Best By Order Today 50 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByOrderToday50.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });

    results = await Ads.find({
        orders: {
            $not: {
                $elemMatch: {
                    statistical_time: { $lt: moment.utc().startOf('day').toDate() }
                }
            }
        },
        last_order: { $lt: 50, $gte: 10 },
    }, { post_id: 1 })
        .sort({
            last_order: -1
        });
    console.log("Best By Order Today 10 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByOrderToday10.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
}

async function bestByOrderYesterday() {
    let results = await Ads.find({
        orders: {
            $not: {
                $elemMatch: {
                    statistical_time: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() }
                }
            }
        },
        last_yesterday: { $lt: 9999, $gte: 100 },
    }, { post_id: 1 })
        .sort({
            last_yesterday: -1
        });
    console.log("Best By Order Yesterday 100 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByOrderYesterday100.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
    results = await Ads.find({
        orders: {
            $not: {
                $elemMatch: {
                    statistical_time: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() }
                }
            }
        },
        last_yesterday: { $lt: 100, $gte: 50 },
    }, { post_id: 1 })
        .sort({
            last_yesterday: -1
        });
    console.log("Best By Order Yesterday 50 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByOrderYesterday50.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });

    results = await Ads.find({
        orders: {
            $not: {
                $elemMatch: {
                    statistical_time: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() }
                }
            }
        },
        last_yesterday: { $lt: 50, $gte: 10 },
    }, { post_id: 1 })
        .sort({
            last_yesterday: -1
        });

    console.log("Best By Order Yesterday 10 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByOrderYesterday10.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
}

module.exports = { bestByOrderToday, bestByOrderYesterday }