require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
// routers imports
const { createUser, login } = require('./controllers/user-controller.js');
const userRouter = require('./routes/user-router.js');
const articleRouter = require('./routes/article-router.js');

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
app.post('/signup', createUser);
app.post('/signin', login);
// general protected routes for users & articles
// app.use('/users', userRouter);
// app.user('/articles', articleRouter);

app.use(errorLogger);
// app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
