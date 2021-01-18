const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError = require('../errors/AuthError.js');
const { AUTH_REQUIRED_MESSAGE } = require('../utils/constants.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(AUTH_REQUIRED_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      (NODE_ENV === 'production' ? JWT_SECRET : 'dev-key'),
    );
  } catch (err) {
    throw new AuthError(AUTH_REQUIRED_MESSAGE);
  }

  req.user = payload;

  next();
};
