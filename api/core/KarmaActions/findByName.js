'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = (name, options) => models.KarmaAction
  .findOrCreate({
    where: {name},
    defaults: {
      description: _.get(options, 'description'),
      defaultKarmaValue: _.get(options, 'karma'),
    }
  })
  .then(([karmaAction]) => karmaAction ? karmaAction.toJSON() : null);
