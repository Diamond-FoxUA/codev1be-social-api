import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { Story } from '../models/story.js';
import { User } from '../models/user.js';

export const getAllStories = async (req, res) => {
  res.status(200).json({ message: 'All stories received' });
};

export const createStory = async (req, res) => {
  let imgUrl = undefined;

  if (req.file) {
    const publicId = `story-${Date.now()}`; // или story-${new ObjectId()} / story-temp
    const result = await saveFileToCloudinary(req.file.buffer, publicId);
    imgUrl = result.secure_url;
  }

  const story = await Story.create({
    ...req.body,
    ownerId: req.user._id,
    img: imgUrl, // ✅ required field is set before create
  });

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
  res.status(200).json(story);
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

  if (user.favoriteStories.includes(storyId)) {
    throw createHttpError(409, 'Story already saved');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favoriteStories: storyId } },
    { new: true },
  );

  await Story.findByIdAndUpdate(storyId, { $inc: { favoriteCount: 1 } });

  res.status(200).json(updatedUser.favoriteStories);
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

  if (!user.favoriteStories.includes(storyId)) {
    throw createHttpError(409, 'Story is not in favorites');
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { favoriteStories: storyId } },
    { new: true },
  );

  await Story.updateOne(
    { _id: storyId, favoriteCount: { $gt: 0 } },
    { $inc: { favoriteCount: -1 } },
  );

  res.status(200).json(updatedUser.favoriteStories);
};
