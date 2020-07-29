'use strict';
const crypto = require('crypto');

exports = module.exports = (salt, password) => crypto.createHash('sha256')
  .update(salt)
  .update(password)
  .digest('hex');
