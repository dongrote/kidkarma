'use strict';
const _ = require('lodash'),
  models = require('../../db/models'),
  Auth = require('../Auth');

exports = module.exports = (username, password) => {
  const passwordSalt = `${Date.now()}`,
    passwordHash = Auth.passwordHash(passwordSalt, password);
  return models.User.create({username, passwordSalt, passwordHash, isParent: true})
    .then(parent => _.omit(parent.toJSON(), ['passwordSalt', 'passwordHash']));
};
