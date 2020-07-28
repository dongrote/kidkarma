'use strict';
const env = require('../../env'),
  jwt = require('jsonwebtoken');

exports = module.exports = signed => new Promise((resolve, reject) => {
  jwt.verify(signed, env.jwtSigningKey(), {algorithms: [env.jwtSigningAlgorithm()]}, (err, decoded) => err ? reject(err) : resolve(decoded));
});
