const salesProductService = require('../services/salesProductsService');

const createSalesProduct = async (req, res) => {
  try {
    const { saleId, productId, quantity } = req.body;

    const newSale = await salesProductService.createSalesProduct({ saleId, productId, quantity });
    return res.status(201).json(newSale);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};
module.exports = {
  createSalesProduct,
};