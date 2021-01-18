require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { Joi, celebrate, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
// routers imports
const { createUser, login } = require('./controllers/user-controller.js');
const userRouter = require('./routes/user-router.js');
const articleRouter = require('./routes/article-router.js');
const auth = require('./middlewares/auth.js');

const app = express();
const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.get('/', (req, res) => res.send('Hello World!'));

mongoose.connect(
  (process.env.MONGO_URL = 'mongodb://localhost:27017/newsexplorer'),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);
app.use(bodyParser.json());
// signup & login unprotected routes
app.post(
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
app.post(
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
app.use('/users', auth, userRouter);
app.use('/articles', auth, articleRouter);
// errors handling
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
