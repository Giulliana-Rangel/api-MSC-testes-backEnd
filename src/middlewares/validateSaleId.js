const getById = require('../services/salesService');

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;

  const hasId = await getById.getById(id);

  if (!hasId || id === undefined) return res.status(404).json({ message: 'Sale not found' });
  next();
};

module.export = validateSaleId;

// sale id ()