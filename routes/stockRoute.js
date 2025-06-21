const express = require('express');
const router = express.Router();
const stock = require('../services/stockService').stock;

router.get('/stock/:productId', (req, res) => {
  const stockInfo = stock[req.params.productId];
  if (stockInfo) {
    res.json(stockInfo);
  } else {
    res.status(404).json({ message: 'Stok bilgisi bulunamadı.' });
  }
});

module.exports = router;
