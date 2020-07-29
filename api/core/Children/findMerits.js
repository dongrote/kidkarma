'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = (ChildId, options) => models.MeritInstance
  .findAndCountAll({
    offset: _.get(options, 'offset', 0),
    limit: _.get(options, 'limit'),
    where: {ChildId},
    include: [models.Merit],
  })
  .then(({count, rows}) => ({count, merits: rows.map(r => r.toJSON())}));
