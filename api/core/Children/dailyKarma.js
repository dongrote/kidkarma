'use strict';
const _ = require('lodash'),
  findMeritsForToday = require('./findMeritsForToday'),
  findDemeritsForToday = require('./findDemeritsForToday');

exports = module.exports = (ChildId, utcOffset) => Promise
  .all([findMeritsForToday, findDemeritsForToday].map(f => f(ChildId, utcOffset)))
  .then(([merits, demerits]) => {
    const good = _.sumBy(_.get(merits, 'merits', []), merit => merit.karma),
      bad = _.sumBy(_.get(demerits, 'demerits', []), demerit => demerit.karma);
    return {good, bad, net: good - bad};
  });
