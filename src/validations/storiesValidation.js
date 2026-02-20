import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const storyIdSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(32),
    description: Joi.string().max(200).allow(''),
  }),
};
