const salesService = require('../services/salesService');

const create = async (req, res) => {
  try {
    const productArray = req.body;

    const saleId = await salesService.create(productArray);
    // console.log(saleId);
    return res.status(201).json({ saleId, productArray });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  create,
};