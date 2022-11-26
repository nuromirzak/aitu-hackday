const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Product = require("../models/product");
const {
  url_shopkz_audio,
  url_shopkz_camera,
  url_shopkz_pc,
  url_shopkz_smartphones,
  url_shopkz_tv,
} = require("./requestUrls");
const addShopKz = require("./shopKzParser");

const db_Url = `mongodb+srv://username:${process.env.MONGODB_PASSWORD}@cluster-0.ypif198.mongodb.net/test`;

mongoose
  .connect(db_Url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));

// Drop collection before adding new data
Product.collection.drop();

addShopKz(url_shopkz_smartphones);
addShopKz(url_shopkz_tv);
addShopKz(url_shopkz_audio);
addShopKz(url_shopkz_pc);
addShopKz(url_shopkz_camera);
