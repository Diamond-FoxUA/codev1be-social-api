import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

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

export const getUsersSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().required(),
    perPage: Joi.number().integer().min(4).max(9).required(),
  }),
};

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(32),
    description: Joi.string().max(150).allow(''),
  }),
};



