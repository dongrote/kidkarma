'use strict';
const os = require('os');

exports = module.exports = () => {
  const total = os.totalmem(),
    free = os.freemem();
  return {total, free, used: total - free};
};
