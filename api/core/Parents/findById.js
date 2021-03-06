'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = ParentId => models.User
  .findByPk(ParentId, {
    attributes: ['id', 'username', 'firstName', 'lastName', 'isParent'],
    include: [{
      association: 'Children',
      attributes: ['id', 'username', 'firstName', 'lastName'],
    }],
  })
  .then(parent => parent ? parent.toJSON() : null)
  .then(parent => _.get(parent, 'isParent', false) ? parent : null);
