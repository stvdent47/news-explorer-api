const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 5 * 1000,
  max: 10,
});
