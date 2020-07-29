'use strict';
const _ = require('lodash'),
  findMerits = require('./findMerits'),
  findDemerits = require('./findDemerits');

exports = module.exports = ChildId => Promise
  .all([findMerits, findDemerits].map(f => f(ChildId)))
  .then(([merits, demerits]) => {
    const good = _.sumBy(_.get(merits, 'merits', []), merit => merit.karma),
      bad = _.sumBy(_.get(demerits, 'demerits', []), demerit => demerit.karma);
    return {good, bad, net: good - bad};
  });
