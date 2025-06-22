require('dotenv').config();
const path = require('path');

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.BFF_PORT || 3000;

const PRODUCT_SERVICE_PORT = process.env.PRODUCT_SERVICE_PORT || 3001;
const STOCK_SERVICE_PORT = process.env.STOCK_SERVICE_PORT || 3002;
const REVIEW_SERVICE_PORT = process.env.REVIEW_SERVICE_PORT || 3003;

app.get('/api/products/:id', async (req, res) => {
  try {
    const [productResponse, stockResponse, reviewResponse] = await Promise.all([
      axios.get(
        `http://localhost:${PRODUCT_SERVICE_PORT}/products/${req.params.id}`
      ),
      axios.get(
        `http://localhost:${STOCK_SERVICE_PORT}/stock/${req.params.id}`
      ),
      axios.get(
        `http://localhost:${REVIEW_SERVICE_PORT}/reviews/${req.params.id}`
      ),
    ]);
    const product = productResponse.data;
    const stock = stockResponse.data;
    const reviews = reviewResponse.data;

    const productDetail = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      currency: product.currency,
      imageUrl: product.imageUrl,
      stock: {
        quantity: stock.available,
        inStock: stock.reserved,
      },
      reviews: reviews.map((review) => ({
        user: review.userId,
        id: review.id,
        comment: review.comment,
        rating: review.rating,
      })),
      averageRating:
        reviews.length > 0
          ? (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)
          : 0,
    };
    res.json(productDetail);
  } catch (error) {
    console.error('Ürün detayı alınırken hata oluştu:', error.message);
    if (error.response) {
      res
        .status(error.response.status)
        .json({ message: error.response.data.message || 'Bir hata oluştu.' });
    } else {
      res.status(500).json({ message: 'Sunucu hatası.' });
    }
  }
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`BFF servisi http://localhost:${PORT} adresinde çalışıyor.`);
});
