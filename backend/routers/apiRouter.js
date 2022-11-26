const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/api/all', async (req, res) => {
    let products = await Product.find();
    res.json(products)
});

router.get('/api/products/:id', async (req, res) => {
    let products = await Product.findById(req.params.id);
    res.json(products)
});

router.get('/api/:category', async (req, res) => {
    let products = await Product.find({item_category: req.params.category});
    res.json(products)
});

module.exports = router;