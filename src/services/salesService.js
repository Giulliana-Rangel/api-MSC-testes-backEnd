const JOI = require('joi');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const salesProductModel = require('../models/salesProductModel');
const { salesSchema } = require('../middlewares/validateSales');

const create = async (productArray) => {
  const salesArraySchema = JOI.array().items(salesSchema);
  const { error } = salesArraySchema.validate(productArray);
  if (error) {
    const [{ type, message }] = error.details;
    const status = type === 'number.min' ? 422 : 400;
    throw Object({ status, message });
  }
  const getProductbyId = await Promise.all(productArray
    .map((saleProduct) => productsModel.getById(saleProduct.productId)));
    
    if (getProductbyId.includes(undefined)) {
      return { type: 404, message: 'Product not found' };
    }
  const idNewSale = await salesModel.create();
  
  await Promise.all(productArray.map(async (sale) => salesProductModel
    .createSalesProduct({ saleId: idNewSale,
       productId: sale.productId, 
       quantity: sale.quantity })));

  return { id: idNewSale, itemsSold: productArray };
};

const getAll = async () => {
  const salesList = await salesProductModel.getAll();
  return salesList;
};

const getById = async (id) => {
  const saleById = await salesProductModel.getById(id);
  return saleById;
};

const remove = async (id) => {
  const hasId = await salesProductModel.getById(id);
  console.log('AQUIIIIII =>', hasId);
  if (!hasId.length) return { status: 404, message: 'Sale not found' };

  await salesProductModel.remove(id);
  return { status: 204 };
};

const update = async (id, saleArray) => {
  // const salesArraySchema = JOI.array().items(salesSchema);
  // const { error } = salesArraySchema.validate(saleArray);
  // if (error) {
  //   const [{ type, message }] = error.details;
  //   const status = type === 'number.min' ? 422 : 400;
  //   throw Object({ status, message });
  // }
  const hasId = await salesProductModel.getById({ id });
  // console.log('AQUIIIIII =>', id, saleArray);
  // console.log(hasId);
  if (!hasId.length || hasId === undefined) return { status: 404, message: 'Sale not found' };

  await salesProductModel.update(saleArray);

  return { status: 200, id, itemsUpdated: [{ saleArray }] };
};

module.exports = {
  create, 
  getAll,
  getById,
  remove,
  update,
};

// promisse.all() recebe um array como parâmetro