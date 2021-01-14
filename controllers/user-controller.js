const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const jwt = require('../utils/jwt.js');
// errors importsd
const BadRequestError = require('../errors/BadRequestError.js');
const UniqueError = require('../errors/UniqueError.js');
const AuthError = require('../errors/AuthError.js');

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    throw new BadRequestError('Переданные данные некорректны');
  } else if (password.trim() === '') {
    throw new BadRequestError('Переданные данные некорректны');
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new UniqueError(
          'Пользователь с таким электронным адресом уже существует',
        );
      }

      return bcrypt.hash(password.trim(), 10)
        .then((passwordHash) => {
          User.create({
            name,
            email,
            password: passwordHash,
          })
            .then(
              res.status(201).send({ message: 'Пользователь успешно создан' }),
            )
            .catch(next);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AuthError('Переданные данные некорректны');
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.getJwtToken(user._id);

      return res.status(200).send({
        name: user.name,
        email: user.email,
        token,
      });
    })
    .catch(next);
};

// const getUserInfo = (req, res, next) => {
//   // const { Authorization } = req.headers;
// };

module.exports = {
  createUser,
  login,
  // getUserInfo,
};
