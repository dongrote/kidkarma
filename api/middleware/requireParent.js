'use strict';
const HttpError = require('http-error-constructor');

exports = module.exports = (req, res, next) => next(
  _.get(req.jwt, 'parent', false) ? undefined : new HttpError(403, 'Forbidden: must be a parent')
);
