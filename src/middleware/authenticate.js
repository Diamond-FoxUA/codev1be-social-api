import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';
import { createSession, setSessionCookies } from '../utils/session.js';

export const authenticate = async (req, res, next) => {
  const { accessToken, refreshToken, sessionId } = req.cookies;

  let session = null;

  if (accessToken) {
    session = await Session.findOne({ accessToken });

    if (session) {
      const isAccessExpired =
        new Date() > new Date(session.accessTokenValidUntil);

      if (!isAccessExpired) {
        const user = await User.findById(session.userId);
        req.user = user;
        return next();
      }
    }
  }

  if (!refreshToken || !sessionId) {
    throw createHttpError(401, 'Missing refresh token');
  }

  session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isRefreshExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isRefreshExpired) {
    throw createHttpError(401, 'Refresh token expired');
  }

  await session.deleteOne();

  const newSession = await createSession(session.userId);

  setSessionCookies(res, newSession);

  const user = await User.findById(session.userId);

  req.user = user;

  next();
};
