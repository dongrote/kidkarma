'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = (name, options) => models.Demerit
  .findOrCreate({
    where: {shortDescription: name},
    defaults: {
      fullDescription: _.get(options, 'description'),
      karmaValue: _.get(options, 'karma'),
    }
  })
  .then(([demerit]) => demerit ? demerit.toJSON() : null);
