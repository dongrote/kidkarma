'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = options => models.Demerit
  .findAndCountAll({offset: _.get(options, 'offset', 0), limit: _.get(options, 'limit')})
  .then(({count, rows}) => ({count, demerits: rows.map(r => r.toJSON())}));
