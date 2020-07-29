'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = ChildId => models.User
  .findByPk(ChildId, {
    attributes: ['id', 'username', 'firstName', 'lastName', 'isParent'],
    include: [{
      association: 'Parents',
      attributes: ['id', 'username', 'firstName', 'lastName'],
    }],
  })
  .then(child => child ? child.toJSON() : null)
  .then(child => _.get(child, 'isParent', false) ? null : child);
