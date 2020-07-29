'use strict';
const env = require('../../env'),
  jwt = require('jsonwebtoken'),
  Users = require('../Users'),
  log = require('debug-logger')('core:Auth:generateLoginToken');

exports = module.exports = (username, password) => Users.authenticate(username, password)
  .catch(err => {
    log.error(err);
    return null;
  })
  .then(user => user ? new Promise((resolve, reject) => {
    jwt.sign({
      id: user.id,
      parent: user.isParent,
      child: !user.isParent,
    }, env.jwtSigningKey(), {
      algorithm: env.jwtSigningAlgorithm(),
      expiresIn: env.jwtExpiresIn(),
    }, (err, signed) => err ? reject(err) : resolve(signed));
  }) : null);
