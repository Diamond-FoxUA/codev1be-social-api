import { Joi, Segments } from "celebrate";

export const getAllStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(5).max(20),
    category: Joi.string(),
  })
};
