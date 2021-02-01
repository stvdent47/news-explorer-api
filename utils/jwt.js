const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('./constants.js');

module.exports.getJwtToken = (id) => jwt.sign(
  { id },
  NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
  { expiresIn: '7d' },
);
