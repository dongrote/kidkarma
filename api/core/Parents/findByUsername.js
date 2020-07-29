'use strict';
const models = require('../../db/models');

exports = module.exports = username => models.User
  .findOne({
    where: {username, isParent: true},
    attributes: ['username', 'firstName', 'lastName'],
    include: [{
      association: 'Children',
      attributes: ['username', 'firstName', 'lastName'],
    }],
  })
  .then(parent => parent ? parent.toJSON() : null);
