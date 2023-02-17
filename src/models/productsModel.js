const camelize = require('camelize');
const connection = require('./connection'); 

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return camelize(result);
};

const create = async ({ name }) => {
  const query = 'INSERT INTO products (name) VALUES(?)';
  const [newProduct] = await connection.execute(query, [name]);
  return newProduct.insertId;
};

const updateById = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [result] = await connection.execute(query, [name, id]);
  return result;
};

const remove = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};
  
module.exports = {
  getAll,
  getById,
  create,
  updateById,
  remove,
};