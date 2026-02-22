import { User } from '../models/user.js';
import { Story } from '../models/story.js';
import createHttpError from 'http-errors';

export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 4;
  const skip = (page - 1) * perPage;

  const totalAuthorsResult = await Story.aggregate([
    { $group: { _id: "$ownerId" } },
    { $count: "count" }
  ]);
  const totalAuthors = totalAuthorsResult[0]?.count || 0;
  const totalPages = Math.ceil(totalAuthors / perPage);

  const users = await Story.aggregate([
    {
      $group: {
        _id: "$ownerId",
        totalFavorites: { $sum: "$favoriteCount" }
      }
    },
    { $sort: { totalFavorites: -1 } },
    { $skip: skip },
    { $limit: perPage },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        _id: "$user._id",
        name: "$user.name",
        avatarUrl: "$user.avatarUrl",
        totalFavorites: 1
      }
    }
  ]);

  res.status(200).json({
    page,
    perPage,
    totalAuthors,
    totalPages,
    users
  });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).lean();
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const stories = await Story.find({ ownerId: id })
    .sort({ date: -1 })
    .lean();

  res.status(200).json({
    user,
    stories
  });
};

export const getCurrentUser = async (req, res) => {
  const { _id, name, avatarUrl, description } = req.user;

  res.status(200).json({
    _id,
    name,
    description,
    avatarUrl,
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
      { avatar: result.secure_url },
      { new: true }
    );

    if (!user) throw createHttpError(404, 'User not found');

    res.status(200).json({ url: user.avatar });
  } catch (err) {
    next(err);
  }
};
