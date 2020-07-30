'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../../../core');

exports = module.exports = (req, res, next) => {
  const ChildId = Number(req.query.ChildId),
    options = {offset: Number(_.get(req.query, 'offset', 0))},
    limit = Number(_.get(req.query, 'limit'));
  if (isNaN(ChildId) || isNaN(options.offset)) {
    return Promise.resolve(next(new HttpError(400)));
  }
  if (!isNaN(limit)) {
    options.limit = limit;
  }
  return core.Auth.mayAccessChild(req.jwt, ChildId)
    .then(permitted => permitted ? core.Children.history(ChildId, options) : new HttpError(403))
    .then(results => res.json(results))
    .catch(next);
};
