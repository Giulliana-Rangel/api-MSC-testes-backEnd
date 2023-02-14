const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const productId = await productsModel.getById(id);
  // console.log(productId);
  return productId;
};

module.exports = {
  getAll,
  getById,
};