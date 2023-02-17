const connection = require('./connection'); 

const create = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [newSale] = await connection.execute(query);
  // console.log(newSale);
  return newSale.insertId;
};

// const getAll = async () => {
//   const query = 'SELECT * FROM StoreManager.sales ORDER BY saleId ASC, productId ASC';
//   const [result] = await connection.execute(query);
//   return result;
// };

module.exports = {
  create,
  // getAll,
};