const { Ads, Favorites } = require('./model')
const moment = require('moment')
    // moment.utc().startOf('day')
console.log(moment.utc().toDate())
async function bestByOrderToday() {
    let output = { order100: '', order50: '', order10: '' }
    let results = await Ads.find({
            // orders: {
            //     $not: {
            //         $elemMatch: {
            //             statistical_time: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() }
            //         }
            //     }
            // },
            created_at: {
                $gte: moment.utc().startOf('day').subtract(1, "days").toDate(),
                $lte: moment.utc().startOf('day').toDate()
            },
            last_order: { $lt: 9999, $gte: 100 },
        }, { post_id: 1 })
        .sort({
            last_order: -1
        });
    results = results.map(elm => elm.post_id).join(',')
    output.order100 = results
    results = await Ads.find({
            // orders: {
            //     $not: {
            //         $elemMatch: {
            //             statistical_time: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() }
            //         }
            //     }
            // },
            created_at: {
                $gte: moment.utc().startOf('day').subtract(1, "days").toDate(),
                $lte: moment.utc().startOf('day').toDate()
            },
            last_order: { $lt: 100, $gte: 50 },
        }, { post_id: 1 })
        .sort({
            last_order: -1
        });
    results = results.map(elm => elm.post_id).join(',')
    output.order50 = results
    results = await Ads.find({
            // orders: {
            //     $not: {
            //         $elemMatch: {
            //             statistical_time: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() }
            //         }
            //     }
            // },
            created_at: {
                $gte: moment.utc().startOf('day').subtract(1, "days").toDate(),
                $lte: moment.utc().startOf('day').toDate()
            },
            last_order: { $lt: 50, $gte: 10 },
        }, { post_id: 1 })
        .sort({
            last_order: -1
        });
    results = results.map(elm => elm.post_id).join(',')
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
    results = results.map(elm => elm.post_id).join(',')
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
    results = results.map(elm => elm.post_id).join(',')
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

    results = results.map(elm => elm.post_id).join(',')
    output.order10 = results
    return output
}

async function bestByReactToday() {
    let output = { react7000: '', react3000: '', react1000: '', react1000: '', react500: '' }

    // 7000
    let results = await Ads.find({
            // tracking_time_arr: {
            //     $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
            // },
            created_at: {
                $gte: moment.utc().startOf('day').subtract(1, "days").toDate(),
                $lte: moment.utc().startOf('day').toDate()
            },
            action: { $in: ["SHOP_NOW", "GET_OFFER", "ORDER_NOW", "BUY_NOW"] },
            reactions: { $gte: 7000 },
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    results = results.map(elm => elm.post_id).join(',')
    output.react7000 = results

    // 3000
    results = await Ads.find({
            // tracking_time_arr: {
            //     $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
            // },
            created_at: {
                $gte: moment.utc().startOf('day').subtract(1, "days").toDate(),
                $lte: moment.utc().startOf('day').toDate()
            },
            action: { $in: ["SHOP_NOW", "GET_OFFER", "ORDER_NOW", "BUY_NOW"] },
            reactions: { $lt: 7000, $gte: 3000 },
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    results = results.map(elm => elm.post_id).join(',')
    output.react3000 = results

    // 1000
    results = await Ads.find({
            // tracking_time_arr: {
            //     $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
            // },
            created_at: {
                $gte: moment.utc().startOf('day').subtract(1, "days").toDate(),
                $lte: moment.utc().startOf('day').toDate()
            },
            action: { $in: ["SHOP_NOW", "GET_OFFER", "ORDER_NOW", "BUY_NOW"] },
            reactions: { $lt: 3000, $gte: 1000 },
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    results = results.map(elm => elm.post_id).join(',')
    output.react1000 = results

    // 500
    results = await Ads.find({
            // tracking_time_arr: {
            //     $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
            // },
            created_at: {
                $gte: moment.utc().startOf('day').subtract(1, "days").toDate(),
                $lte: moment.utc().startOf('day').toDate()
            },
            action: { $in: ["SHOP_NOW", "GET_OFFER", "ORDER_NOW", "BUY_NOW"] },
            reactions: { $lt: 1000, $gte: 500 },
            shares_reactions: { $gte: 0.2 }
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    results = results.map(elm => elm.post_id).join(',')
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
            action: { $in: ["SHOP_NOW", "GET_OFFER", "ORDER_NOW", "BUY_NOW"] },
            reactions: { $gte: 7000 },
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    results = results.map(elm => elm.post_id).join(',')
    output.react7000 = results

    // 3000
    results = await Ads.find({
            tracking_time_arr: {
                $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
            },
            action: { $in: ["SHOP_NOW", "GET_OFFER", "ORDER_NOW", "BUY_NOW"] },
            reactions: { $lt: 7000, $gte: 3000 },
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    results = results.map(elm => elm.post_id).join(',')
    output.react3000 = results

    // 1000
    results = await Ads.find({
            tracking_time_arr: {
                $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
            },
            action: { $in: ["SHOP_NOW", "GET_OFFER", "ORDER_NOW", "BUY_NOW"] },
            reactions: { $lt: 3000, $gte: 1000 },
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    results = results.map(elm => elm.post_id).join(',')
    output.react1000 = results

    // 500
    results = await Ads.find({
            tracking_time_arr: {
                $not: { $elemMatch: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() } }
            },
            action: { $in: ["SHOP_NOW", "GET_OFFER", "ORDER_NOW", "BUY_NOW"] },
            reactions: { $lt: 1000, $gte: 500 },
            shares_reactions: { $gte: 0.2 }
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });

    results = results.map(elm => elm.post_id).join(',')
    output.react500 = results

    return output
}

async function bestByOrderReactToday() {
    let output = ''

    let results = await Ads.find({
            // orders: {
            //     $not: {
            //         $elemMatch: {
            //             statistical_time: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() }
            //         }
            //     }
            // },
            created_at: {
                $gte: moment.utc().startOf('day').subtract(1, "days").toDate(),
                $lte: moment.utc().startOf('day').toDate()
            },
            last_order: { $gte: 10 },
            reactions: { $gte: 1000 },
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });


    output = results.map(elm => elm.post_id).join(',')
    return output
}

async function bestByOrderReactYesterday() {
    let output = ''
        // 7000
    let results = await Ads.find({
            orders: {
                $not: {
                    $elemMatch: {
                        statistical_time: { $lt: moment.utc().startOf('day').subtract(1, "days").toDate() }
                    }
                }
            },
            $or: [{ last_yesterday: { $gte: 50 } }, { last_order: { $gte: 50 } }],
            reactions: { $gte: 1000 },
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });
    output = results.map(elm => elm.post_id).join(',')
    return output
}

async function best1000react50order() {
    let r = await Ads.find({
            $or: [{ last_yesterday: { $gte: 50 } }, { last_order: { $gte: 50 } }],
            reactions: { $gte: 1000 },
            post_date: {
                $gte: moment.utc().startOf('day').subtract(21, 'days').toDate().getTime() / 1000,
                $lte: moment.utc().startOf('day').toDate().getTime() / 1000
            }
        }, { post_id: 1 })
        .sort({
            reactions: -1
        });
    r = r.map(elm => elm.post_id).join(',')
    return r
}

async function bestReactChange() {
    let r = await Ads.aggregate([{
            $match: {
                post_date: {
                    $gte: moment.utc().startOf('day').subtract(21, 'days').toDate().getTime() / 1000,
                    $lte: moment.utc().startOf('day').toDate().getTime() / 1000
                },
                action: { $in: ["SHOP_NOW", "GET_OFFER", "ORDER_NOW", "BUY_NOW"] },
            }
        },
        {
            $project: {
                post_id: 1,
                react1: { $arrayElemAt: ["$reactions_arr", -2] },
                react2: { $arrayElemAt: ["$reactions_arr", -1] }
            },

        },
        {
            $project: {
                post_id: 1,
                react2: 1,
                diff: { $subtract: ["$react2", "$react1"] }
            }
        },
        { $match: { $or: [{ diff: { $gte: 1000 } }, { diff: { $gte: 500 }, react2: { $lte: 3000 } }] } },
    ])
    r = r.map(elm => elm.post_id).join(',')
    return r
}

async function getFavorite() {
    let r = await Favorites.find({
        created_at: {
            $gte: moment.utc().startOf('day').subtract(30, 'days').toDate(),
            $lte: moment.utc().startOf('day').toDate()
        }
    }, { post_id: 1 }).sort({ created_at: -1 })
    r = [...new Set(r.map(elm => elm.post_id))].join(',')
    console.log(r)
    return r
}

module.exports = { bestByOrderToday, bestByOrderYesterday, bestByReactToday, bestByReactYesterday, bestByOrderReactToday, bestByOrderReactYesterday, best1000react50order, bestReactChange, getFavorite }