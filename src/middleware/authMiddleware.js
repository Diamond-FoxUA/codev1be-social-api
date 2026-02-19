import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import createHttpError from 'http-errors';

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Not authorized'));
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    req.user = user; // attach for controller
    next();
  } catch {
    next(createHttpError(401, 'Invalid token'));
  }
};
