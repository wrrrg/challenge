require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const {
  NODE_ENV, MONGODB_URI_TEST, MONGODB_URI,
} = process.env;

mongoose.Promise = global.Promise;
const isTest = NODE_ENV === 'test';

mongoose.connect(isTest ? MONGODB_URI_TEST : MONGODB_URI);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  next();
});
if (!isTest) app.use(morgan('dev'));
app.use(require('./routes/index.js'));

module.exports = app;

const port = process.env.PORT || 3000;
if (!isTest) {
  app.listen(port);
}

console.log(`server running on ${port}`); // eslint-disable-line no-console
