const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const { getJwtToken } = require('../utils/jwt.js');
// errors imports
const AuthError = require('../errors/AuthError.js');
const BadRequestError = require('../errors/BadRequestError.js');
const NotFoundError = require('../errors/NotFoundError.js');
const UniqueError = require('../errors/UniqueError.js');
const {
  BAD_REQUEST_MESSAGE,
  UNIQUE_USER_ERROR_MESSAGE,
  USER_CREATION_SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require('../utils/constants.js');

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    throw new BadRequestError(BAD_REQUEST_MESSAGE);
  } else if (password.trim() === '') {
    throw new BadRequestError(BAD_REQUEST_MESSAGE);
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new UniqueError(UNIQUE_USER_ERROR_MESSAGE);
      }

      return bcrypt
        .hash(password.trim(), 10)
        .then((passwordHash) => {
          User.create({
            name,
            email,
            password: passwordHash,
          })
            .then(
              res.status(201).send({ message: USER_CREATION_SUCCESS_MESSAGE }),
            )
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AuthError(BAD_REQUEST_MESSAGE);
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = getJwtToken(user._id);

      return res.status(200).send({
        name: user.name,
        email: user.email,
        // id: user._id,
        token,
      });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => User.findById(req.user.id)
  .orFail(new NotFoundError(NOT_FOUND_MESSAGE))
  .then((user) => res.status(200).send({
    name: user.name,
    email: user.email,
  }))
  .catch(next);

module.exports = {
  createUser,
  login,
  getUserInfo,
};
