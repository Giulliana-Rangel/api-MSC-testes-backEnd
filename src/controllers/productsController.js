const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const productId = await productsService.getById(id);
  // console.log(productId);
  
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

const updateById = async (req, res) => {
   try {
    const { id } = req.params;
    const { name } = req.body;
    const update = await productsService.updateById(id, name);
    return res.status(update.status).json(update.message);
  } catch (error) {
      return res.status(error.status).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  await productsService.remove(id);
  res.status(204).end();
};

module.exports = {
  getAll, 
  getById,
  create,
  updateById,
  remove,
};