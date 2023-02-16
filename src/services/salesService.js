const JOI = require('joi');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const salesProductModel = require('../models/salesProductModel');
const salesSchema = require('../middlewares/validateSales');

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

// const create2 = async (productArray) => {
//   const salesArraySchema = JOI.array().items(salesSchema);
//   const { error } = salesArraySchema.validate(productArray);
//   if (error) {
//     const err = { status: 400, message: error.message };
//     throw err;
//   }

//   const newSalesPromisses = productArray.map((sale) => salesModel.create(sale));
//   console.log(newSalesPromisses);
//   const newSalesResolvePromise = await Promise.all(newSalesPromisses);

//   const newSales = productArray
//     .map((sale, index) => ({ id: newSalesResolvePromise[index], ...sale }));
  
//   return newSales.sort((a, b) => a.id - b.id);
// };

module.exports = {
  create, 
};

// promisse.all() recebe um array como parâmetro