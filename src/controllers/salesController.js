const salesService = require('../services/salesService');

const create = async (req, res) => {
  try {
    const { date } = req.body;

    const saleId = await salesService.create({ date });
    console.log(saleId);
    return res.status(201).json({ saleId, date });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};
module.exports = {
  create,
};