require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();
const publicFolder = path.join(__dirname, 'public')
const staticServe = express.static(publicFolder);

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(staticServe);
app.use(middlewares.defaultLimiter);
app.use(middlewares.startTransaction);
app.use(middlewares.commitTransaction);
app.use(middlewares.rollbackTransaction);

// Routes
app.use(
  '/api/auth',
  routes.auth
);
app.use(
  '/api/funds',
  middlewares.authenticatedLimiter,
  middlewares.authenticate,
  routes.funds
);
app.use(
  '/*',
  middlewares.authenticatedLimiter,
  function (_, res) {
    res.sendFile(path.join(publicFolder, 'index.html'));
  }
);

module.exports = app;
