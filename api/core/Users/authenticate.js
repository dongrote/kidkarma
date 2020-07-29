'use strict';
const _ = require('lodash'),
  models = require('../../db/models'),
  Auth = require('../Auth');

exports = module.exports = (username, password) => models.User.findOne({where: {username}})
  .then(user => user ? user.toJSON() : null)
  .then(user => Auth.passwordHash(_.get(user, 'passwordSalt', ''), password) === _.get(user, 'passwordHash') ? user : null)
  .then(user => user ? _.omit(user, ['passwordSalt', 'passwordHash']) : user);
