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

async function bestByReactToday() {
    // 7000
    let results = await Ads.find({
        tracking_time_arr: {
            $not: { $elemMatch: { $lt: moment.utc().startOf('day').toDate() } }
        },
        action: { $in: ["SHOP_NOW", "LEARN_MORE", "GET_OFFER"] },
        reactions: { $gte: 7000 },
    }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    console.log("Best By React Today 7000 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByReactToday7000.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
    // 3000
    results = await Ads.find({
        tracking_time_arr: {
            $not: { $elemMatch: { $lt: moment.utc().startOf('day').toDate() } }
        },
        action: { $in: ["SHOP_NOW", "LEARN_MORE", "GET_OFFER"] },
        reactions: { $lt: 7000, $gte: 3000 },
    }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    console.log("Best By React Today 3000 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByReactToday3000.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
    // 1000
    results = await Ads.find({
        tracking_time_arr: {
            $not: { $elemMatch: { $lt: moment.utc().startOf('day').toDate() } }
        },
        action: { $in: ["SHOP_NOW", "LEARN_MORE", "GET_OFFER"] },
        reactions: { $lt: 3000, $gte: 1000 },
    }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    console.log("Best By React Today 1000 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByReactToday1000.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });

    // 500
    results = await Ads.find({
        tracking_time_arr: {
            $not: { $elemMatch: { $lt: moment.utc().startOf('day').toDate() } }
        },
        action: { $in: ["SHOP_NOW", "LEARN_MORE", "GET_OFFER"] },
        reactions: { $lt: 1000, $gte: 500 },
        shares_reactions: { $gte: 0.2 }
    }, { post_id: 1 })
        .sort({
            reactions: -1
        });


    console.log("Best By React Today 500 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByReactToday500.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
}

async function bestByReactYesterday() {
    // 7000
    let results = await Ads.find({
        tracking_time_arr: {
            $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
        },
        action: { $in: ["SHOP_NOW", "LEARN_MORE", "GET_OFFER"] },
        reactions: { $gte: 7000 },
    }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    console.log("Best By React Yesterday 7000 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByReactYesterday7000.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
    // 3000
    results = await Ads.find({
        tracking_time_arr: {
            $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
        },
        action: { $in: ["SHOP_NOW", "LEARN_MORE", "GET_OFFER"] },
        reactions: { $lt: 7000, $gte: 3000 },
    }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    console.log("Best By React Yesterday 3000 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByReactYesterday3000.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
    // 1000
    results = await Ads.find({
        tracking_time_arr: {
            $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
        },
        action: { $in: ["SHOP_NOW", "LEARN_MORE", "GET_OFFER"] },
        reactions: { $lt: 3000, $gte: 1000 },
    }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    console.log("Best By React Yesterday 1000 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByReactYesterday1000.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });

    // 500
    results = await Ads.find({
        tracking_time_arr: {
            $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
        },
        action: { $in: ["SHOP_NOW", "LEARN_MORE", "GET_OFFER"] },
        reactions: { $lt: 1000, $gte: 500 },
        shares_reactions: { $gte: 0.2 }
    }, { post_id: 1 })
        .sort({
            reactions: -1
        });


    console.log("Best By React Yesterday 500 Size:", results.length)
    results = results.map(elm => `${elm.post_id}`).join(',')
    await fs.writeFile('bestByReactYesterday500.txt', results, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.", err);
        }
    });
}
module.exports = { bestByOrderToday, bestByOrderYesterday, bestByReactToday, bestByReactYesterday }