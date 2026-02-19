import { Joi, Segments } from "celebrate";

export const paginationQuerySchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Page number must be a number",
      "number.integer": "Page number must be an integer",
      "number.min": "Page number cannot be less than {#limit}",
    }),

    limit: Joi.number().integer().min(1).max(50).default(12).messages({
      "number.base": "Limit must be a number",
      "number.integer": "Limit must be an integer",
      "number.min": "Limit cannot be less than {#limit}",
      "number.max": "Limit cannot exceed {#limit}",
    }),
  }),
};
