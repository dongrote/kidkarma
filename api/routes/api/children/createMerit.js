'use strict';
const HttpError = require('http-error-constructor'),
  core = require('../../../core');

exports = module.exports = (req, res, next) => {
  const ParentId = req.jwt.id,
    ChildId = req.body.ChildId,
    merit = req.body.merit,
    options = {};
  if (_.has(req.body, 'karma')) {
    options.karma = req.body.karma;
  }
  if (_.has(req.body, 'description')) {
    options.description = req.body.description;
  }
  if (!(ChildId && merit)) {
    return Promise.resolve(next(new HttpError(400)));
  }
  return core.Children.addMerit(ParentId, ChildId, merit, options)
    .then(meritInstance => res.json(meritInstance))
    .catch(next);
};
