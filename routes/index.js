const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login } = require('../controllers/user-controller');
const userRouter = require('./user-router.js');
const articleRouter = require('./article-router.js');
const auth = require('../middlewares/auth.js');
// signup & login unprotected routes
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
// general protected routes for users & articles
router.use('/users', auth, userRouter);
router.use('/articles', auth, articleRouter);

module.exports = router;
