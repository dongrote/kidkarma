'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = (ChildId, options) => models.DemeritInstance
  .findAndCountAll({
    offset: _.get(options, 'offset', 0),
    limit: _.get(options, 'limit'),
    where: {ChildId},
    include: [models.Demerit],
  })
  .then(({count, rows}) => ({count, demerits: rows.map(r => r.toJSON())}));
