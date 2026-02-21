import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('This id is not valid');
  }
  return value;
};

export const storyIdSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createStorySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(5).max(80).required().messages({
      'string.empty': 'Title is required',
      'string.max': 'Title must be at most 80 characters',
    }),
    description: Joi.string().min(5).max(2500).required().messages({
      'string.empty': 'Description is required',
      'string.max': 'Description must be at most 2500 characters',
    }),
    category: Joi.string().custom(objectIdValidator).required(),
    img: Joi.string().default('https://placehold.co/600x400'),
  }),
};
export const updateStorySchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(5).max(80).messages({
      'string.max': 'Title must be at most 80 characters',
    }),
    description: Joi.string().min(5).max(2500).messages({
      'string.empty': 'Description is required',
      'string.max': 'Description must be at most 2500 characters',
    }),
    category: Joi.string().custom(objectIdValidator),
    img: Joi.string().default('https://placehold.co/600x400'),
  }).min(1),
};

export const getSvaedStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(4),
  })
};
