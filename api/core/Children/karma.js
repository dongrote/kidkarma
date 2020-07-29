'use strict';
const dailyKarma = require('./dailyKarma'),
  allKarma = require('./allKarma');

exports = module.exports = (ChildId, utcOffset) => Promise
  .all([dailyKarma(ChildId, utcOffset), allKarma(ChildId)])
  .then(([daily, total]) => ({daily, total}));
