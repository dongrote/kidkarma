'use strict';
const _ = require('lodash'),
  models = require('../../db/models'),
  publishKarmaState = require('./publishKarmaState'),
  KarmaActions = require('../KarmaActions');

exports = module.exports = (ParentId, ChildId, action, options) => KarmaActions
  .findByName(action, {
    description: _.get(options, 'description'),
    karma: -Math.abs(_.get(options, 'karma', 0)),
  })
  .then(karmaAction => models.KarmaActionEvent.create({
    ParentId,
    ChildId,
    KarmaActionId: karmaAction.id,
    karma: -Math.abs(_.get(options, 'karma', karmaAction.defaultKarmaValue)),
    utcOffset: _.get(options, 'utcOffset', 0),
    remarks: _.get(options, 'remarks'),
  }, {include: [models.KarmaAction]}))
  .then(row => row.toJSON())
  .then(row => publishKarmaState(ChildId, row)
    .then(() => row));
