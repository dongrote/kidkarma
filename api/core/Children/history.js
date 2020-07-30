'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = (ChildId, options) => models.KarmaActionEvent
  .findAndCountAll({
    where: {ChildId},
    offset: _.get(options, 'offset', 0),
    limit: _.get(options, 'limit'),
    order: [['createdAt', 'DESC']],
    include: [
      models.KarmaAction,
      {model: models.User, as: 'Child', attributes: ['username', 'firstName', 'lastName']},
      {model: models.User, as: 'Parent', attributes: ['username', 'firstName', 'lastName']},
    ],
  })
  .then(({count, rows}) => ({count, items: rows.map(r => r.toJSON())}));
