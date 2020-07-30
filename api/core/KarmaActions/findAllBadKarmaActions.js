'use strict';
const _ = require('lodash'),
  models = require('../../db/models'),
  {Op} = models.Sequelize;

exports = module.exports = options => models.KarmaAction
  .findAndCountAll({
    offset: _.get(options, 'offset', 0),
    limit: _.get(options, 'limit'),
    where: {defaultKarmaValue: {[Op.lt]: 0}},
  })
  .then(({count, rows}) => ({count, items: rows.map(r => {
    const json = r.toJSON();
    json.goodKarma = false;
    json.badKarma = true;
    json.defaultKarmaValue = -json.defaultKarmaValue;
    return json;
  })}));
