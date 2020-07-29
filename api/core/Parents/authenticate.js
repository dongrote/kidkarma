'use strict';
const _ = require('lodash'),
  models = require('../../db/models'),
  Auth = require('../Auth');

exports = module.exports = (username, password) => models.User.findOne({where: {username}})
  .then(parent => parent ? parent.toJSON() : null)
  .then(parent => Auth.passwordHash(_.get(parent, 'passwordSalt', ''), password) === _.get(parent, 'passwordHash') ? parent : null)
  .then(parent => parent ? _.omit(parent, ['passwordSalt', 'passwordHash']) : parent);
