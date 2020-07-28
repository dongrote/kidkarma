'use strict';
const _ = require('lodash');

exports = module.exports = {
  port: () => Number(_.get(process.env, 'PORT', 3000)),
  jwtSigningKey: () => _.get(process.env, 'JWT_SIGNING_KEY'),
  jwtSigningAlgorithm: () => _.get(process.env, 'JWT_SIGNING_ALGORITHM', 'HS256'),
};
