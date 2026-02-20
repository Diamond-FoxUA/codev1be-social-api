import { Story } from "../models/story.js";

export const getAllStories = async (req, res) => {
  const { page = 1, perPage = 5, category } = req.query;

  const skip = (page - 1) * perPage;

  const storiesQuery = Story.find();

  if (category) {
    storiesQuery.where({category: category});
  }

  const [total, stories] = await Promise.all([
    storiesQuery.clone().countDocuments(),
    storiesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  res.status(200).json({
    data: stories,
    total,
    page,
    totalPages
  });
};
