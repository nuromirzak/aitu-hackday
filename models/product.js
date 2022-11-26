const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_id: Number,
    item_name: String,
    item_category: String,
    img_url: String,
    shop: String,
    price: Number,
    shop_addresses: [{address : String, coordinate: {lng : Number, lat :Number}}]
}, {timestamps : true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;