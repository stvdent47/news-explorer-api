const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getJwtToken = (id) => jwt.sign(
  { id },
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
  { expiresIn: '7d' },
);
