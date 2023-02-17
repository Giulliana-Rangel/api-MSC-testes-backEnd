const salesService = require('../services/salesService');

const create = async (req, res) => {
  try {
    const productArray = req.body;

    const newSales = await salesService.create(productArray);
    // console.log(newSales);
    // return res.status(201).json({ newSales, productArray });
    if (newSales.type) {
      return res.status(newSales.type).json({ message: newSales.message });
    }
    return res.status(201).json(newSales);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  const salesList = await salesService.getAll();
  res.status(200).json(salesList);
};

const getById = async (req, res) => {
    const { id } = req.params;
  const saleById = await salesService.getById(id);
  if (saleById.length === 0) return res.status(404).json({ message: 'Sale not found' });
   return res.status(200).json(saleById); 
};

module.exports = {
  create,
  getAll,
  getById,
};
