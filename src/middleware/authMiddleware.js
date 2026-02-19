import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const session = await Session.findOne({ accessToken });

  if (!session) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  req.user = user;
  req.session = session;

  next();
};