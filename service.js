const { Ads } = require('./model')
const moment = require('moment')
const fs = require('fs')
// moment.utc().startOf('day')
async function bestByOrderToday() {
    let output = { order100: '', order50: '', order10: '' }
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
    output.order100 = results
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
    output.order50 = results
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
    output.order10 = results
    return output
}

async function bestByOrderYesterday() {
    let output = { order100: '', order50: '', order10: '' }
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
    output.order100 = results

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
    output.order50 = results

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
    output.order10 = results

}

async function bestByReactToday() {
    let output = { react7000: '', react3000: '', react1000: '', react1000: '', react500: '' }

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
    output.react7000 = results

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
    output.react3000 = results

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
    output.react1000 = results

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
    output.react500 = results
    return output
}

async function bestByReactYesterday() {
    let output = { react7000: '', react3000: '', react1000: '', react1000: '', react500: '' }
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
    output.react7000 = results

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
    output.react3000 = results

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
    output.react1000 = results

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
    output.react500 = results

    return output
}

module.exports = { bestByOrderToday, bestByOrderYesterday, bestByReactToday, bestByReactYesterday }