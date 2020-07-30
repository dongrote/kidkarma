'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../../../core');

exports = module.exports = (req, res, next) => {
  const offset = Number(_.get(req.query, 'offset', 0)),
    limit = Number(_.get(req.query, 'limit')),
    options = {offset};
  if (!isNaN(limit)) {
    options.limit = limit;
  }
  if (isNaN(offset)) {
    return Promise.resolve(next(new HttpError(400)));
  }
  return core.KarmaActions.findAllBadKarmaActions(options)
    .then(results => res.json(results))
    .catch(next);
};
