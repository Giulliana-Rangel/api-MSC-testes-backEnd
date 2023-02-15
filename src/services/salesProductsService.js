const salesProductModel = require('../models/salesProductModel');

const createSalesProduct = async () => {
  await salesProductModel.createSalesProduct();
};

module.exports = createSalesProduct;