import { Joi, Segments } from 'celebrate';

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).required(),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).max(32).required(),
    token: Joi.string().required(),
  }),
};
