'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.System.health()
  .then(health => res.json(health))
  .catch(next);
