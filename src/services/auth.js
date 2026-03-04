export const setSessionCookies = (res, session) => {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: FIFTEEN_MINUTES,
    path: '/',
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: ONE_DAY,
    path: '/',
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: ONE_DAY,
    path: '/',
  });
};
