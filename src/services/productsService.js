const JOI = require('joi');
const productsModel = require('../models/productsModel');

const productSchema = JOI.object({
  name: JOI.string().min(5).required().label('name'),
}).messages({
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
  'string.empty': '{{label}} is required',
});

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const productId = await productsModel.getById(id);
  // console.log(productId);
  return productId;
};

const create = async ({ name }) => {
  const { error } = productSchema.validate({ name });

  if (error) {
    // // console.log(error);
    // const err = { status: 400, message: error.message };
    // throw err;
    const [{ type, message }] = error.details;
    const status = type === 'string.min' ? 422 : 400;
    throw Object({ status, message });
  }
  const newProduct = await productsModel.create({ name });
  return newProduct;
};

module.exports = {
  getAll,
  getById,
  create,
};