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
  // console.log(id);
  const [sale] = await connection.execute(`SELECT s.date, sp.product_id, sp.quantity 
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?
   ORDER BY sp.sale_id ASC, sp.product_id asc`, [id]);
  return camelize(sale);
};

const update = async ({ quantity, saleId, productId }) => {
  console.log('model', quantity);
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products 
    SET quantity = ? 
    WHERE sale_id = ? AND product_id = ?`,
    [quantity, saleId, productId],
  );
  return result;
};

const remove = async (id) => {
  console.log('model', id);
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [removeSale] = await connection.execute(query, [id]);
  // console.log('model', removeSale);
  return removeSale;
};

// const getByIdUpdate = async (saleId) => {
//   const query = 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?';
//   const [[justId]] = await connection.execute(query, [saleId]);
//   return justId;
// };

// const update = async ( id, productId, quantity ) => {
//   console.log('model', id);
//   console.log('model', productId);
//   console.log('model', quantity);
//   const query = `UPDATE StoreManager.sales_products SET quantity = (?) 
//   WHERE sale_id = ? AND product_id = ?`;
//   const [result] = await connection.execute(query, [quantity, id, productId]);
//   console.log('model', result);
//   return result;
// };

module.exports = {
  createSalesProduct,
  getAll,
  getById,
  remove,
  update,
  // getByIdUpdate,
};