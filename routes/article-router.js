const articleRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/article-controller.js');
const { BadRequestError } = require('../errors/BadRequestError.js');
const { BAD_REQUEST_MESSAGE } = require('../utils/constants.js');

const linkValidator = (value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestError(BAD_REQUEST_MESSAGE);
  }
  return value;
};

articleRouter.get('/', getArticles);
articleRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(linkValidator),
      image: Joi.string().required().custom(linkValidator),
    }),
  }),
  createArticle,
);
articleRouter.delete(
  '/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteArticle,
);

module.exports = articleRouter;
