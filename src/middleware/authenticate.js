import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';
import { setSessionCookies, updateSession } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  if (!req.cookies.accessToken && !req.cookies.refreshToken) {
    throw createHttpError(401, 'Missing access token and refresh token');
  }

  try {
    if (req.cookies.accessToken) {
      const session = await Session.findOne({
        accessToken: req.cookies.accessToken,
      });

      if (!session) {
        throw createHttpError(401, 'Session not found + access token');
      }

      const isAccessTokenExpired =
        new Date() > new Date(session.accessTokenValidUntil);

      if (isAccessTokenExpired) {
        throw createHttpError(401, 'Access token expired');
      }

      const user = await User.findById(session.userId);

      if (!user) {
        throw createHttpError(401);
      }

      req.user = user;
    }

    next();
  } catch (error) {
    console.log('catch + before if');

    if (req.cookies.refreshToken) {
      console.log('catch + before session');
      const session = await Session.findOne({
        refreshToken: req.cookies.refreshToken,
      });
      console.log('catch + after session ');
      if (!session) {
        throw createHttpError(401, 'Session not found + refresh token');
      }
      console.log('catch + after session if');
      const isRefreshTokenExpired =
        new Date() > new Date(session.refreshTokenValidUntil);
      console.log('catch + before isRefreshTokenExpired');
      if (isRefreshTokenExpired) {
        throw createHttpError(401, 'Refresh token expired');
      }
      console.log('catch + before user find');

      const user = await User.findById(session.userId);
      console.log('catch + after user find');

      if (!user) {
        throw createHttpError(401);
      }
      console.log('catch + before updateSession');

      await updateSession(session._id);

      setSessionCookies(res, session);

      req.user = user;
      req.session = session;
      res.testCheck = true;
      next();
    } else {
      next(error);
    }
  }
};
