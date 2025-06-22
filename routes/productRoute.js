const express = require('express');
const router = express.Router();
const products = require('../services/productService.js');

router.get('/products/:id', (req, res) => {
  const product = products[req.params.id];
  if (product) {
    res.json(product);
  } else {
    console.log('products:', products);

    res.status(404).json({ message: 'Ürün Bulunamadı' });
  }
});

module.exports = router;
