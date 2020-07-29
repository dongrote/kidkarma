'use strict';
const HttpError = require('http-error-constructor'),
  core = require('../../../core');

exports = module.exports = (req, res, next) => {
  const ParentId = req.jwt.id,
    ChildId = req.body.ChildId,
    demerit = req.body.demerit,
    options = {};
  if (_.has(req.body, 'karma')) {
    options.karma = req.body.karma;
  }
  if (_.has(req.body, 'description')) {
    options.description = req.body.description;
  }
  if (!(ChildId && demerit)) {
    return Promise.resolve(next(new HttpError(400)));
  }
  return core.Children.addDemerit(ParentId, ChildId, demerit, options)
    .then(demeritInstance => res.json(demeritInstance))
    .catch(next);
};
