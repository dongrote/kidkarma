'use strict';
const _ = require('lodash'),
  models = require('../../db/models'),
  Auth = require('../Auth'),
  Parents = require('../Parents');

exports = module.exports = (ParentId, username, password) => {
  const passwordSalt = `${Date.now()}`,
    passwordHash = Auth.passwordHash(passwordSalt, password);
  return models.Child.create({username, passwordSalt, passwordHash})
    .then(child => Parents.addChild(ParentId, child.id)
      .then(() => _.omit(child.toJSON(), ['passwordSalt', 'passwordHash'])));
};
