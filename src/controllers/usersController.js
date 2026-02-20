import { User } from "../models/user.js";
import { Story } from "../models/story.js";
import createHttpError from "http-errors";


export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const perPage = 4;
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
    {
      $sort: { totalFavorites: -1 }
    },
    {
      $skip: skip
    },
    {
      $limit: perPage
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {
        _id: "$user._id",
        name: "$user.name",
        avatar: "$user.avatar",
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
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({
    user,
    stories
  });
};
