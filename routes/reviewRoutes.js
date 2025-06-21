const express = require('express');
const router = express.Router();
const reviews = require('../services/reviewService').reviews;

router.get('/reviews/:productId', (req, res) => {
  const productReviews = reviews[req.params.productId] || [];
  res.json(productReviews);
});

module.exports = router;
