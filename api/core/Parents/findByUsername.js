'use strict';
const models = require('../../db/models');

exports = module.exports = username => models.User
  .findOne({
    where: {username, isParent: true},
    attributes: ['id', 'username', 'firstName', 'lastName'],
    include: [{
      association: 'Children',
      attributes: ['id', 'username', 'firstName', 'lastName'],
    }],
  })
  .then(parent => parent ? parent.toJSON() : null);
