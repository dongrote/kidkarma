'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

const userAttributes = [
  'username',
  'firstName',
  'lastName',
];

exports = module.exports = (ChildId, options) => models.KarmaActionEvent
  .findAndCountAll({
    where: {ChildId},
    offset: _.get(options, 'offset', 0),
    limit: _.get(options, 'limit'),
    include: [
      models.KarmaAction,
      {model: models.User, as: 'Child', attributes: userAttributes},
      {model: models.User, as: 'Parent', attributes: userAttributes},
    ],
  })
  .then(({count, rows}) => ({count, items: rows.map(r => r.toJSON())}));
