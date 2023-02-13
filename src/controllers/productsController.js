const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const productId = await productsService.getById(id);
  
  if (!productId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(productId);
};

module.exports = {
  getAll,
  getById,
};