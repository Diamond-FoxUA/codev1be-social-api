import { Joi, Segments } from "celebrate";

export const getUserByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    _id: Joi.string()
      .length(24)
      .hex()
      .required()
      .messages({
        "string.base": "User ID must be a string",
        "string.length": "User ID must be 24 characters",
        "string.hex": "User ID must be a valid hex string",
        "any.required": "User ID is required",
      }),
  }),
};
