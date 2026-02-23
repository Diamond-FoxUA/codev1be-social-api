import { User } from '../models/user.js';
import { Story } from '../models/story.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/savefileToCloudinary.js';

export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;
  const skip = (page - 1) * perPage;

  const totalAuthors = await User.countDocuments();

  const users = await User.find()
    .sort({ _id: 1 })
    .skip(skip)
    .limit(perPage)
    .select('name description avatarUrl articlesAmount savedArticles');

  res.status(200).json({
    page,
    perPage,
    totalAuthors,
    totalPages: Math.ceil(totalAuthors / perPage),
    users
  });
};


export const getUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).lean();
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const stories = await Story.find({ ownerId: userId })
    .sort({ date: -1 })
    .lean();

  res.status(200).json({
    user,
    stories
  });
};

export const getCurrentUser = async (req, res) => {
  const { _id, name, avatarUrl, description, articlesAmount, savedArticles } = req.user;

  res.status(200).json({
    _id,
    name,
    description,
    avatarUrl,
    articlesAmount,
    savedArticles
  });
};
export const updateUser = async (req, res) => {
  const userId = req.user._id;
  const { name, description } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, description },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    status: "success",
    name: updatedUser.name,
    description: updatedUser.description,
    avatarUrl: updatedUser.avatarUrl,
  });
};

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'No file');
    }

    const publicId = `avatar-${req.user._id}`;
    const result = await saveFileToCloudinary(req.file.buffer, publicId);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl: result.secure_url },
      { new: true }
    );

    if (!user) throw createHttpError(404, 'User not found');

    res.status(200).json({ url: user.avatarUrl });
  } catch (err) {
    next(err);
  }
};
