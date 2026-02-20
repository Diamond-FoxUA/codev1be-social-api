import { Joi, Segments } from 'celebrate';

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(32),
    description: Joi.string().max(200).allow(''),
  }),
};
