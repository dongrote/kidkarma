'use strict';
const Websockets = require('../Websockets'),
  karma = require('./karma');

exports = module.exports = (ChildId, karmaEvent) => karma(ChildId, karmaEvent.utcOffset)
  .then(karmaState => Promise
    .all([
      Websockets.publish('karma', {ChildId, karma: karmaState}),
      Websockets.publish('event', {ChildId, event: karmaEvent}),
    ]));
