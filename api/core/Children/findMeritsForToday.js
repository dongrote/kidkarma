'use strict';
const _ = require('lodash'),
  Time = require('../Time'),
  models = require('../../db/models'),
  {Op} = models.Sequelize;

exports = module.exports = (ChildId, utcOffset, options) => {
  const startDate = Time.startOfToday(utcOffset);
  return models.MeritInstance
    .findAndCountAll({
      offset: _.get(options, 'offset', 0),
      limit: _.get(options, 'limit'),
      where: {
        ChildId,
        createdAt: {[Op.gte]: startDate},
      },
      include: [models.Merit],
    })
    .then(({count, rows}) => ({count, merits: rows.map(r => r.toJSON())}));
};
