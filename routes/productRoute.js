const express = require('express');
const router = express.Router();

router.get('/products/:id', (req, res) => {
  const product = req.params.id;
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Ürün Bulunamadı' });
  }
});

module.exports = router;
