const validateProductId = (req, res, next) => {
  const productArray = req.body;

  const hasProduct = productArray.every(({ productId }) => (
    productId !== undefined));

  if (!hasProduct) {
    return res.status(404).json({
      message:
    'Product not found' });
  }
  next();
};

module.exports = validateProductId;