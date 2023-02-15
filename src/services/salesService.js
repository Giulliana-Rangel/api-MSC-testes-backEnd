const salesModel = require('../models/salesModel');

const create = async ({ date }) => {
  const newSale = await salesModel.create({ date });
  return newSale;
};

module.exports = {
  create,
};
