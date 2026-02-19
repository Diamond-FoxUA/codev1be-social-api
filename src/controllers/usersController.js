import { User } from "../models/user.js";
import { Article } from "../models/article.js";


//  GET /users
export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find()
        .sort({ articlesAmount: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(),
    ]);

    res.json({
      status: 200,
      message: "Users list retrieved successfully",
      data: users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    next(error);
  }
};


//  GET /users/:_id
export const getUserById = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const user = await User.findById(_id).lean();

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const articles = await Article.find({ ownerId: _id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      status: 200,
      message: "User data retrieved successfully",
      data: {
        user,
        articles,
      },
    });
  } catch (error) {
    next(error);
  }
};
