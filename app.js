require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const rateLimiter = require('./middlewares/rateLimiter.js');

const router = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler.js');
const { MONGO_URL_DEV, MONGO_CONNECTION_SUCCESS_MESSAGE, MONGO_CONNECTION_FAIL_MESSAGE } = require('./utils/constants.js');

const app = express();
const { PORT = 3000, CORS_ORIGIN } = process.env;

app.use(requestLogger);

mongoose
  .connect((process.env.MONGO_URL = MONGO_URL_DEV), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log(MONGO_CONNECTION_SUCCESS_MESSAGE))
  .catch((err) => console.log(`${MONGO_CONNECTION_FAIL_MESSAGE}: ${err.message}`));

const corsOptions = {
  origin: CORS_ORIGIN || '*',
  optionsSuccessStatus: 200,
};
app.use(express.json(), cors(corsOptions));
app.use(rateLimiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);
// errors handling
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, console.log(`Example app listening on port ${PORT}!`));
