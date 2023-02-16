const salesProductModel = require('../models/salesProductModel');

const createSalesProduct = async ({ saleId, productId, quantity }) => {
  const newSale = await salesProductModel.createSalesProduct({ saleId, productId, quantity });
  return newSale;
};

module.exports = createSalesProduct;
