'use strict';
const _ = require('lodash'),
  Time = require('../Time'),
  models = require('../../db/models'),
  {Op} = models.Sequelize;

const userAttributes = [
  'username',
  'firstName',
  'lastName',
];
  
exports = module.exports = (ChildId, utcOffset, options) => {
  const startDate = Time.startOfToday(utcOffset);
  return models.KarmaActionEvent
    .findAndCountAll({
      offset: _.get(options, 'offset', 0),
      limit: _.get(options, 'limit'),
      where: {
        ChildId,
        createdAt: {[Op.gte]: startDate},
      },
      include: [
        models.KarmaAction,
        {model: models.User, as: 'Child', attributes: userAttributes},
        {model: models.User, as: 'Parent', attributes: userAttributes},
      ],
    })
    .then(({count, rows}) => ({count, items: rows.map(r => r.toJSON())}));
};
