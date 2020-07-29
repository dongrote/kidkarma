'use strict';
const _ = require('lodash'),
  models = require('../../db/models');

exports = module.exports = ParentId => models.User
  .findByPk(ParentId, {
    attributes: ['username', 'firstName', 'lastName'],
    include: [{
      association: 'Children',
      attributes: ['username', 'firstName', 'lastName'],
    }],
  })
  .then(parent => parent ? parent.toJSON() : null)
  .then(parent => _.get(parent, 'isParent', false) ? parent : null);
