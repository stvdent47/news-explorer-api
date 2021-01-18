const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Поле "keyword" обязательно для заполнения'],
  },
  title: {
    type: String,
    required: [true, 'Поле "title" обязательно для заполнения'],
  },
  text: {
    type: String,
    required: [true, 'Поле "text" обязательно для заполнения'],
  },
  date: {
    type: String,
    required: [true, 'Поле "date" обязательно для заполнения'],
  },
  source: {
    type: String,
    required: [true, 'Поле "source" обязательно для заполнения'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" обязательно для заполнения'],
    validate: {
      validator(v) {
        const regex = /^(https?:\/\/)(www\.)?[\w-]+(\.[a-z])+[\w~!@#$%&*()-+=:;\\'",.?/]+#?/gi;
        return regex.test(v);
      },
      message: 'Поле "link" должно содержать валидный url-адрес',
    },
  },
  image: {
    type: String,
    required: [true, 'Поле "image" обязательно для заполнения'],
    validate: {
      validator(v) {
        const regex = /^(https?:\/\/)(www\.)?[\w-]+(\.[a-z])+[\w~!@#$%&*()-+=:;\\'",.?/]+#?/gi;
        return regex.test(v);
      },
      message: 'Поле "image" должно содержать валидный url-адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
