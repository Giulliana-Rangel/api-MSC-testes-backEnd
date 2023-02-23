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

const getSearch = async (prod) => {
  const search = await productsModel.getSearch(prod);
  return search;
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

const updateById = async (id, name) => {
  const { error } = productSchema.validate({ name });
  if (error) {
    const [{ type, message }] = error.details;
    const status = type === 'string.min' ? 422 : 400;
    throw Object({ status, message });
  }
  const hasProduct = await productsModel.getById(id);
  // console.log('AQUI', hasProduct);
  if (!hasProduct) return { status: 404, message: { message: 'Product not found' } };
  
 await productsModel.updateById(id, name);
  // console.log('AQUI', updatedProduct);
  return { status: 200, message: { id, name } };
};

const remove = async (id) => {
  const hasProduct = await productsModel.getById(id);

 if (!hasProduct) return { status: 404, message: 'Product not found' };
  
  await productsModel.remove(id);

  return { status: 204 };
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  remove,
  getSearch,
};