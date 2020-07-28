'use strict';
const express = require('express'),
  app = express();
exports = module.exports = app;
const _ = require('lodash'),
  log = require('debug-logger')('api:app'),
  HttpError = require('http-error-constructor'),
  cookieParser = require('cookie-parser'),
  httpLogger = require('morgan'),
  router = require('./routes');

app.use(httpLogger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);
app.use((req, res, next) => next(new HttpError(404)));
app.use((err, req, res, next) => {
  log.error(err);
  res.status(_.get(err, 'statusCode', 500)).send(err.message);
});
