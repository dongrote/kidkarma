'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = (name, options) => models.Merit
  .findOrCreate({
    where: {shortDescription: name},
    defaults: {
      fullDescription: _.get(options, 'description'),
      karmaValue: _.get(options, 'karma'),
    }
  })
  .then(([merit]) => merit ? merit.toJSON() : null);
