const Article = require('../models/article.js');
const BadRequestError = require('../errors/BadRequestError.js');
const { BAD_REQUEST_MESSAGE, UNIQUE_ARTICLE_ERROR_MESSAGE, NOT_FOUND_MESSAGE } = require('../utils/constants.js');
const NotFoundError = require('../errors/NotFoundError.js');
const UniqueError = require('../errors/UniqueError.js');

const getArticles = (req, res, next) => Article.find({})
  .then((articles) => res.status(200).send(articles))
  .catch(next);

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  if (!keyword || !title || !text || !date || !source || !link || !image) {
    throw new BadRequestError(BAD_REQUEST_MESSAGE);
  }

  return Article.findOne({ link })
    .then((article) => {
      if (article) {
        throw new UniqueError(UNIQUE_ARTICLE_ERROR_MESSAGE);
      }

      Article.create({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
        owner: req.user.id,
      })
        .then(res.status(201).send({ message: 'Статья была успешно сохранена' }))
        .catch(next);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  if (!articleId) {
    throw new BadRequestError(BAD_REQUEST_MESSAGE);
  }

  return Article.findByIdAndDelete(articleId)
    .orFail(new NotFoundError(NOT_FOUND_MESSAGE))
    .then(res.status(200).send({ message: 'Статья была успешно удалена' }))
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
