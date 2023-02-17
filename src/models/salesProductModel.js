const camelize = require('camelize');
const connection = require('./connection'); 

const createSalesProduct = async ({ saleId, productId, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?) ',
    [saleId, productId, quantity],
  );
  return camelize(result);
};

const getAll = async () => {
  const query = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity 
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    ORDER BY sp.sale_id ASC, sp.product_id asc `;
  const [result] = await connection.execute(query);
  return camelize(result);
};

const getById = async (id) => {
  const [sale] = await connection.execute(`SELECT s.date, sp.product_id, sp.quantity 
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?
   ORDER BY sp.sale_id ASC, sp.product_id asc`, [id]);
  return camelize(sale);
};

module.exports = {
  createSalesProduct,
  getAll,
  getById,
};