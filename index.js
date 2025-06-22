const express = require('express');
const app = express();

const productRoute = require('./routes/productRoute');
const stockRoute = require('./routes/stockRoute');
const reviewRoute = require('./routes/reviewRoute');

const BFF_PORT = process.env.BFF_PORT || 3000;
const PRODUCT_SERVICE_PORT = process.env.PRODUCT_SERVICE_PORT || 3001;
const STOCK_SERVICE_PORT = process.env.STOCK_SERVICE_PORT || 3002;
const REVIEW_SERVICE_PORT = process.env.REVIEW_SERVICE_PORT || 3003;

const productServiceApp = express();
productServiceApp.use('/', productRoute);
productServiceApp.listen(PRODUCT_SERVICE_PORT, () => {
  console.log(
    `Ürün servisi http://localhost:${PRODUCT_SERVICE_PORT} adresinde çalışıyor.`
  );
});
const stockServiceApp = express();
stockServiceApp.use('/', stockRoute);
stockServiceApp.listen(STOCK_SERVICE_PORT, () => {
  console.log(
    `Stok servisi http://localhost:${STOCK_SERVICE_PORT} adresinde çalışıyor.`
  );
});
const reviewServiceApp = express();
reviewServiceApp.use('/', reviewRoute);
reviewServiceApp.listen(REVIEW_SERVICE_PORT, () => {
  console.log(
    `Yorum servisi http://localhost:${REVIEW_SERVICE_PORT} adresinde çalışıyor.`
  );
});

console.log(
  `BFF servisi http://localhost:${BFF_PORT} adresinde çalışmaya hazır.`
);
console.log(
  `BFF'yi çalıştırmak için 'node bff.js' komutunu ayrı bir terminalde çalıştırın.`
);
