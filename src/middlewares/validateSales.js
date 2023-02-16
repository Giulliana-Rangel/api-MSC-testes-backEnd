const JOI = require('joi');
 
const salesSchema = JOI.object({
  productId: JOI.number().integer().min(1).required()
.label('productId'),
  quantity: JOI.number().integer().min(1).required()
.label('quantity'),

}).messages({
  'any.required': '{{#label}} is required',
  'number.min': '{{#label}} must be greater than or equal to 1',
  'number.empty': '{{#label} Product not found}',
});

module.exports = salesSchema;
