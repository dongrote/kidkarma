'use strict';
const _ = require('lodash'),
  core = require('../../../core'),
  HttpError = require('http-error-constructor');

exports = module.exports = (req, res, next) => {
  const ChildId = Number(req.query.ChildId),
    utcOffset = Number(_.get(req.query, 'utcOffset', 0));
  if (isNaN(ChildId) || isNaN(utcOffset)) {
    return Promise.resolve(next(new HttpError(400)));
  }
  return core.Auth.mayAccessChild(req.jwt, ChildId)
    .then(permitted => permitted
      ? core.Children.karma(ChildId, utcOffset)
        .then(karma => res.json(karma))
      : Promise.reject(new HttpError(403)))
    .catch(next);
};
