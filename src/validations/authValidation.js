import { Joi, Segments } from 'celebrate';
//вадидация регистрации
export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().min(8).required(),
    fullName: Joi.string().required().min(3).trim(),
  }),
};
//валидация логина
export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().min(8),
  }),
};
