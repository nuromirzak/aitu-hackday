const express = require('express');
const mongoose = require("mongoose");
const app = express();
const Product = require('./models/product')
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./log-rotator');

const db_Url = `mongodb+srv://username:${process.env.MONGODB_PASSWORD}@cluster-0.ypif198.mongodb.net/test`;

app.use(express.urlencoded({extended: true}));

mongoose.connect(db_Url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || 3000, () => console.log(`Server started on port ${process.env.PORT || 3000}`)))
    .catch((err) => console.log(err));

app.use((req, res, next) => {
    logger.info(`Request URL: ${req.url} Request Type: ${req.method} Request Body: ${JSON.stringify(req.body)}`);
    next();
});

app.get('/all', async (req, res) => {
    let products = await Product.find();
    res.json(products)
})

app.get('/catalog/:category', async (req, res) => {
    let products = await Product.find({item_category: req.params.category});
    res.json(products)
})

app.use(function (err, req, res, next) {
    let obj = {
        "message": err.message, "stack": err.stack, "url": req.url,
    };
    console.log(obj);
    logger.error(obj);
    res.status(500).send('Something broke!');
});