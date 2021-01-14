require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
// routers imports
const userRouter = require('./routes/user-router.js');

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

app.use('/', userRouter);
// app.user('/', articleRouter);

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
