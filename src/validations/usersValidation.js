import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const objectIdValidator = (value, helpers) => {
  if(!isValidObjectId(value)) {
    return helpers.message('This id is not valid');
  }
  return value;
};

export const userIdSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const paginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1),
  perPage: Joi.number().integer().min(4).max(9),
});

export const getUsersSchema = {
  [Segments.QUERY]: paginationQuerySchema,
};

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(3).max(32),
    description: Joi.string().trim().max(150).allow(''),
  }).min(1),
};



