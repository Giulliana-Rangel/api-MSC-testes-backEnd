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

module.exports = {
  create, 
  getAll,
  getById,
};

// promisse.all() recebe um array como parâmetro