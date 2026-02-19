import { User } from '../models/user.js';
import { Story } from '../models/story.js';
import createHttpError from 'http-errors';

export const addToFavorites = async (req, res) => {
  const { storyId } = req.params;
  const { _id: userId } = req.user;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const story = await Story.findById(storyId);
  if (!story) {
    throw createHttpError(404, "Story not found");
  }

  if (user.favoriteStories.includes(storyId)) {
    throw createHttpError(409, "Story already saved");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoriteStories: storyId } },
    { new: true },
  );

  await Story.findByIdAndUpdate(
    storyId,
    { $inc: { favoriteCount: 1 } }
  );

  res.status(200).json(updatedUser.favoriteStories);
};

export const removeFromFavorites = async (req, res) => {
  const { storyId } = req.params;
  const { _id: userId } = req.user;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const story = await Story.findById(storyId);
  if (!story) {
    throw createHttpError(404, "Story not found");
  }

  if (!user.favoriteStories.includes(storyId)) {
    throw createHttpError(409, "Story is not in favorites");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { favoriteStories: storyId } },
    { new: true },
  );

  await Story.updateOne(
    { _id: storyId, favoriteCount: { $gt: 0 } },
    { $inc: { favoriteCount: -1 } }
  );

  res.status(200).json(updatedUser.favoriteStories);
};
