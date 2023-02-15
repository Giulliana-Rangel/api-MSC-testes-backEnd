// const camelize = require('camelize');
const connection = require('./connection'); 

const create = async ({ date }) => {
  const query = 'INSERT INTO sales (date) VALUES (NOW())';
  const [newSale] = await connection.execute(query, [date]);
  return newSale.insertId;
};

module.exports = {
  create,
};