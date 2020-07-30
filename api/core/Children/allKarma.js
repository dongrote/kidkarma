'use strict';
const _ = require('lodash'),
  findKarmaEvents = require('./findKarmaEvents');

exports = module.exports = ChildId => findKarmaEvents(ChildId)
  .then(({items}) => {
    const good = _.sumBy(_.filter(items, i => i.karma > 0), 'karma'),
      bad = _.sumBy(_.filter(items, i => i.karma < 0), 'karma');
    return {good, bad, net: good + bad};
  });
