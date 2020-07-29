'use strict';
const moment = require('moment');

exports = module.exports = utcOffset => {
  const m = new moment();
  m.utcOffset(utcOffset);
  return m.startOf('day').toDate();
};
