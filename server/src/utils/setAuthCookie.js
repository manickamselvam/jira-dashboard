module.exports = function setAuthCookie(res, token) {
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 1000, // 1 hour
  });
};
