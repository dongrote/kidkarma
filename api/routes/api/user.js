'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => (req.jwt.parent ? core.Parents.findById(req.jwt.id) : core.Children.findById(req.jwt.id))
  .then(profile => res.json(profile))
  .catch(next);
