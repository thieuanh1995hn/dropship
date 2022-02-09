var mongoose = require('mongoose');
const adsSchema = new mongoose.Schema({
    post_id: String
});
const Ads = mongoose.model('ads', adsSchema);

const favSchema = new mongoose.Schema({
    post_id: String
});

const Favorites = mongoose.model('favorites', favSchema);
module.exports = { Ads, Favorites }