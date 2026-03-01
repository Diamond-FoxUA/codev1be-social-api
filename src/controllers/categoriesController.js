import { Category } from '../models/category.js';

export const getCategories = async (req, res) => {
  const categories = await Category.find().select('_id name').sort({ name: 1 });

  res.status(200).json(categories);
};
