'use strict';
const Websockets = require('../Websockets'),
  karma = require('./karma');

const utcOffset = -240;

exports = module.exports = ChildId => karma(ChildId, utcOffset)
  .then(karmaState => Websockets.publish('karma', {ChildId, karma: karmaState}));
