import Joi from 'joi';

export const calculatorSchema = Joi.object({
  operation: Joi.string().valid("+", "-", "*", "/").required().messages({
    "string.empty": "The operator is required",
    "any.only": "The operator must be +, -, * or /",
  }),

  number1: Joi.number().min(Number.MIN_SAFE_INTEGER)
  .max(Number.MAX_SAFE_INTEGER).integer().required().messages({
    "number.base": "The first number must be a number",
    "any.required": "numero1 is required",
  }),

  number2: Joi.number().min(Number.MIN_SAFE_INTEGER)
  .max(Number.MAX_SAFE_INTEGER).integer().required().when("operation", {
    is: "/",
    then: Joi.number().not(0).messages({
      "any.invalid": "Number 2 must be different from 0 when the operation is division",
    }),
  }).messages({
    "number.base": "The second number must be a number",
    "any.required": "numero2 is required",
  }),
});
