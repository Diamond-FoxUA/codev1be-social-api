import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

export const getUsersSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
  }),
};

const objectIdValidator = (value, helpers) => {
  if(!isValidObjectId(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

export const userIdSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().custom(objectIdValidator).required(),
  }),
};
