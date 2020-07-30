'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = (ChildId, options) => Promise
  .all([
    models.MeritInstance.findAll({where: {ChildId}, include: [models.Merit], order: [['createdAt', 'DESC']]}),
    models.DemeritInstance.findAll({where: {ChildId}, include: [models.Demerit], order: [['createdAt', 'DESC']]}),
  ])
  .then(([merits, demerits]) => _.concat(_.map(merits, m => m.toJSON()), _.map(demerits, d => d.toJSON())))
  .then(all => _.reverse(_.sortBy(all, a => a.createdAt)))
  .then(sorted => _.slice(sorted, _.get(options, 'offset', 0), _.has(options, 'limit') ? _.get(options, 'offset', 0) + options.limit : undefined));
