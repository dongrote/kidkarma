'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../../../core');

exports = module.exports = (req, res, next) => {
  const ParentId = req.jwt.id,
    ChildId = req.body.ChildId,
    action = req.body.action,
    options = {utcOffset: _.get(req.body, 'utcOffset', 0)};
  if (_.has(req.body, 'karma')) {
    options.karma = Math.abs(req.body.karma);
  }
  if (_.has(req.body, 'description')) {
    options.description = req.body.description;
  }
  if (_.has(req.body, 'remarks')) {
    options.remarks = req.body.remarks;
  }
  if (!(ChildId && action)) {
    return Promise.resolve(next(new HttpError(400)));
  }
  return core.Children.addBadKarma(ParentId, ChildId, action, options)
    .then(karmaActionEvent => res.json(karmaActionEvent))
    .catch(next);
};
