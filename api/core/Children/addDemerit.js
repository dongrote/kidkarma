'use strict';
const _ = require('lodash'),
  models = require('../../db/models'),
  publishKarmaState = require('./publishKarmaState'),
  Demerits = require('../Demerits');

exports = module.exports = (ParentId, ChildId, demeritShortName, options) => Demerits
  .findByName(demeritShortName, {
    description: _.get(options, 'description'),
    karma: _.get(options, 'karma', 0),
  })
  .then(demerit => models.DemeritInstance.create({
    ParentId,
    ChildId,
    DemeritId: demerit.id,
    karma: _.get(options, 'karma', demerit.karmaValue),
  }))
  .then(row => publishKarmaState(ChildId)
    .then(() => row.toJSON()));
