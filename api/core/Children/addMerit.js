'use strict';
const _ = require('lodash'),
  models = require('../../db/models'),
  Merits = require('../Merits');

exports = module.exports = (ParentId, ChildId, meritShortName, options) => Merits
  .findByName(meritShortName, {
    description: _.get(options, 'description'),
    karma: _.get(options, 'karma', 0),
  })
  .then(merit => models.MeritInstance.create({
    ParentId,
    ChildId,
    MeritId: merit.id,
    karma: _.get(options, 'karma', merit.karmaValue),
  }))
  .then(row => row.toJSON());
