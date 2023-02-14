const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const productId = await productsService.getById(id);
  console.log(productId);
  
  if (!productId) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(productId);
}; 

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const id = await productsService.create({ name });
    return res.status(201).json({ id, name });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getAll, 
  getById,
  create,
};