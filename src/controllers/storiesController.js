import { User } from '../models/user.js';
import { Story } from '../models/story.js';
import createHttpError from 'http-errors';

export const addToFavorites = async (req, res) => {
  const { storyId } = req.params;
  const { _id: userId } = req.user;

  const user = await User.findById(userId);
  const story = await Story.findById(storyId);

  if (!story) {
    throw createHttpError(404, 'Story not found');
  }

  if (!user.favoriteStories.includes(storyId)) {
    const newFavorites = [...user.favoriteStories, storyId];

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { favoriteStories: newFavorites },
      { new: true },
    );

    await Story.findByIdAndUpdate(
      storyId,
      { favoriteCount: story.favoriteCount + 1 },
      { new: true },
    );

    return res.status(200).json(updatedUser.favoriteStories);
  }

  res.status(200).json(user.favoriteStories);
};

export const removeFromFavorites = async (req, res) => {
  const { storyId } = req.params;
  const { _id: userId } = req.user;

  const user = await User.findById(userId);
  const story = await Story.findById(storyId);

  const newFavorites = user.favoriteStories.filter(
    (id) => id.toString() !== storyId,
  );

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { favoriteStories: newFavorites },
    { new: true },
  );

  if (story && story.favoriteCount > 0) {
    await Story.findByIdAndUpdate(
      storyId,
      { favoriteCount: story.favoriteCount - 1 },
      { new: true },
    );
  }

  res.status(200).json(updatedUser.favoriteStories);
};
