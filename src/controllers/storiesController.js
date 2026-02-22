import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/savefileToCloudinary.js';
import { Story } from '../models/story.js';
import { User } from '../models/user.js';

export const getAllStories = async (req, res) => {
  const { page = 1, perPage = 3, category } = req.query;

  const skip = (page - 1) * perPage;

  const storiesQuery = Story.find();

  if (category) {
    storiesQuery.where({category: category});
  }

  const [totalStories, stories] = await Promise.all([
    storiesQuery.clone().countDocuments(),
    storiesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalStories / perPage);

  res.status(200).json({
    stories,
    totalStories,
    page,
    perPage,
    totalPages
  });
};

export const createStory = async (req, res) => {
  const story = await Story.create({
    ...req.body, // title, description, category, date и т.д.
    ownerId: req.user._id,
  });

  if (req.file) {
    const publicId = `story-${story._id}`;
    const result = await saveFileToCloudinary(req.file.buffer, publicId);
    story.img = result.secure_url;
    await story.save(); // save link for story
  }

  res.status(201).json(story);
};

export const updateStory = async (req, res) => {
  const { storyId } = req.params;
  //if the file have changed, send new one to Cloudinary & adding it to req.body
  if (req.file) {
    const publicId = `story-${storyId}`; //  storyId for naming
    const result = await saveFileToCloudinary(req.file.buffer, publicId);
    req.body.img = result.secure_url;
  }

  const story = await Story.findOneAndUpdate(
    {
      _id: storyId,
      ownerId: req.user._id,
    },
    req.body,
    { new: true },
  );
  if (!story) {
    throw createHttpError(404, 'Story not found');
  }
  res.status(200).json({ msg: 'Updated!' });
};

export const addToFavorites = async (req, res) => {
  const { storyId } = req.params;
  const { _id: userId } = req.user;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const story = await Story.findById(storyId);
  if (!story) {
    throw createHttpError(404, 'Story not found');
  }

  if (user.savedArticles.includes(storyId)) {
    throw createHttpError(409, 'Story already saved');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { savedArticles: storyId } },
    { new: true },
  );

  await Story.findByIdAndUpdate(storyId, { $inc: { favoriteCount: 1 } });

  res.status(200).json(updatedUser.savedArticles);
};

export const removeFromFavorites = async (req, res) => {
  const { storyId } = req.params;
  const { _id: userId } = req.user;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const story = await Story.findById(storyId);
  if (!story) {
    throw createHttpError(404, 'Story not found');
  }

  if (!user.savedArticles.includes(storyId)) {
    throw createHttpError(409, 'Story is not in favorites');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { savedArticles: storyId } },
    { new: true },
  );

  await Story.updateOne(
    { _id: storyId, favoriteCount: { $gt: 0 } },
    { $inc: { favoriteCount: -1 } },
  );

  res.status(200).json(updatedUser.savedArticles);
};
