import { Joi, Segments } from 'celebrate';
//вадидация регистрации
export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().trim().min(3).required(),
  }),
};
//валидация логина
export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().min(8),
  }),
};
