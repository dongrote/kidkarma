'use strict';
const models = require('../../db/models');

exports = module.exports = username => models.User
  .findOne({
    where: {username, isParent: false},
    attributes: ['username', 'firstName', 'lastName'],
    include: [{
      association: 'Parents',
      attributes: ['username', 'firstName', 'lastName'],
    }],
  })
  .then(parent => parent ? parent.toJSON() : null);
