const salesService = require('../services/salesService');

const create = async (req, res) => {
  try {
    const productArray = req.body;

    const newSales = await salesService.create(productArray);
    console.log(newSales);
    // return res.status(201).json({ newSales, productArray });
    if (newSales.type) {
      return res.status(newSales.type).json({ message: newSales.message });
    }
    return res.status(201).json(newSales);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  create,
};