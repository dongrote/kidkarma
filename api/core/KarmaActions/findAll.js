'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = options => models.KarmaAction
  .findAndCountAll({offset: _.get(options, 'offset', 0), limit: _.get(options, 'limit')})
  .then(({count, rows}) => ({count, items: rows.map(r => {
    const json = r.toJSON();
    json.goodKarma = json.defaultKarmaValue > 0;
    json.badKarma = !json.goodKarma;
    json.defaultKarmaValue = Math.abs(json.defaultKarmaValue);
    return json;
  })}));
