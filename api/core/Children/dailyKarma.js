'use strict';
const _ = require('lodash'),
  findKarmaEventsForToday = require('./findKarmaEventsForToday');

exports = module.exports = (ChildId, utcOffset) => findKarmaEventsForToday(ChildId, utcOffset)
  .then(({items}) => {
    const good = _.sumBy(_.filter(items, i => i.karma > 0), 'karma'),
      bad = _.sumBy(_.filter(items, i => i.karma < 0), 'karma');
    return {good, bad, net: good + bad};
  });
