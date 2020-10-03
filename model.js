var mongoose = require('mongoose');
const adsSchema = new mongoose.Schema(
    {
        post_id: String
    }
);
const Ads = mongoose.model('ads', adsSchema);

module.exports = { Ads }