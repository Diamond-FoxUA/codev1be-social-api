import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('This id is not valid');
  }
  return value;
};

export const storyIdParamsSchema = Joi.object({
  storyId: Joi.string().custom(objectIdValidator).required(),
});

export const storyIdSchema = {
  [Segments.PARAMS]: storyIdParamsSchema,
};

export const paginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1),
  perPage: Joi.number().integer().min(3).max(9),
});

export const paginationSchema = {
  [Segments.QUERY]: paginationQuerySchema,
};

export const getAllStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    category: Joi.string().custom(objectIdValidator),
    offset: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(1).max(50).default(9),
  }),
};

export const createStorySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(5).max(80).required().messages({
      'string.empty': 'Заголовок є обовʼязковим',
      'string.min': 'Мінімум 5 символів',
      'string.max': 'Максимум 80 символів',
    }),
    article: Joi.string().min(5).max(2500).required().messages({
      'string.empty': 'Текст історії є обовʼязковим',
      'string.min': 'Мінімум 5 символів',
      'string.max': 'Максимум 2500 символів',
    }),
    category: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'Оберіть категорію',
      'string.empty': 'Оберіть категорію',
    }),
  }),
};

export const updateStorySchema = {
  [Segments.PARAMS]: storyIdParamsSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(5).max(80).messages({
      'string.max': 'Title must be at most 80 characters',
    }),
    article: Joi.string().min(5).max(2500).messages({
      'string.empty': 'Description is required',
      'string.max': 'Description must be at most 2500 characters',
    }),
    category: Joi.string().custom(objectIdValidator),
    img: Joi.string().uri(),
  }).min(1),
};
