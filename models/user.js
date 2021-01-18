const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const AuthError = require('../errors/AuthError.js');
const { WRONG_CREDENTIALS_MESSAGE } = require('../utils/constants.js');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "Email" обязательно для заполнения'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "Пароль" обязательно для заполнения'],
    minlength: [8, 'Минимальная длина пароля — 8 символов'],
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле "Имя" обязательно для заполнения'],
    minlength: [2, 'Минимальная длина имени — 2 символа'],
    maxlength: [30, 'Максимальная длина имени — 30 символов'],
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(WRONG_CREDENTIALS_MESSAGE);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(WRONG_CREDENTIALS_MESSAGE);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
