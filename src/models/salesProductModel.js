const camelize = require('camelize');
const connection = require('./connection'); 

const createSalesProduct = async ({ saleId, productId, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?) ',
    [saleId, productId, quantity],
);
  return camelize(result);
};

module.exports = {
  createSalesProduct,
};