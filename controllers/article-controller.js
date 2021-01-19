const Article = require('../models/article.js');
const BadRequestError = require('../errors/BadRequestError.js');
const {
  BAD_REQUEST_MESSAGE,
  UNIQUE_ARTICLE_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  WRONG_ARTICLE_ID_MESSAGE,
  ARTICLE_DELETION_FORBIDDEN_MESSAGE,
  ARTICLE_ADDITION_SUCCES_MESSAGE,
} = require('../utils/constants.js');
const ForbiddenError = require('../errors/ForbiddenError.js');
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
        .then(res.status(201).send({ message: ARTICLE_ADDITION_SUCCES_MESSAGE }))
        .catch(next);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  if (!articleId) {
    throw new BadRequestError(BAD_REQUEST_MESSAGE);
  }

  Article.findById(articleId).select('+owner')
    .orFail(new NotFoundError(NOT_FOUND_MESSAGE))
    .then((article) => {
      if (!article) throw new NotFoundError(WRONG_ARTICLE_ID_MESSAGE);

      if (article.owner.toString() === req.user.id.toString()) {
        Article.findByIdAndDelete(articleId)
          .then(res.status(200).send({ message: ARTICLE_ADDITION_SUCCES_MESSAGE }))
          .catch(next);
      } else {
        throw new ForbiddenError(ARTICLE_DELETION_FORBIDDEN_MESSAGE);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
