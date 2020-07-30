'use strict';
const _ = require('lodash'),
  models = require('../../db/models'),
  publishKarmaState = require('./publishKarmaState'),
  KarmaActions = require('../KarmaActions');

exports = module.exports = (ParentId, ChildId, action, options) => KarmaActions
  .findByName(action, {
    description: _.get(options, 'description'),
    karma: _.get(options, 'karma', 0),
  })
  .then(karmaAction => models.KarmaActionEvent.create({
    ParentId,
    ChildId,
    KarmaActionId: karmaAction.id,
    karma: _.get(options, 'karma', karmaAction.defaultKarmaValue),
    remarks: _.get(options, 'remarks'),
  }))
  .then(row => publishKarmaState(ChildId)
    .then(() => row.toJSON()));
