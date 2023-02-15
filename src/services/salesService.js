const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const salesProductModel = require('../models/salesProductModel');

const create = async (productArray) => {
  const getProductbyId = await Promise.all(productArray
    .map(async (saleProduct) => productsModel.getById(saleProduct.productId)));
    
    if (getProductbyId.includes(undefined)) {
      return { type: 404, message: 'Product not found' };
    }
  const idNewSale = await salesModel.create();
  
  await Promise.all(productArray.map(async (sale) => salesProductModel
    .createSalesProduct({ idNewSale, productId: sale.productId, quantity: sale.quantity })));

  return { type: null, id: idNewSale, message: productArray };
};

// const createSalesProduct = async ({ saleId, productId, quantity }) => {
//   const newSale = await salesModel.createSalesProduct({ saleId, productId, quantity });
//   return newSale;
// };

module.exports = {
  create, 
};
