const connection = require('./connection'); 

const create = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [newSale] = await connection.execute(query);
  // console.log(newSale);
  return newSale.insertId;
};

module.exports = {
  create,

};