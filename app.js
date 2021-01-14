require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { PORT = 3000 } = process.env;

app.get('/', (req, res) => res.send('Hello World!'));

mongoose.connect((process.env.MONGO_URL = 'mongodb://localhost:27017/newsexplorer'), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Example app listening on port port!`));
