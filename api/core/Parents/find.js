'use strict';
const models = require('../../db/models');

exports = module.exports = username => models.User
  .findOne({
    where: {username},
    attributes: ['username', 'firstName', 'lastName'],
    include: [{
      model: models.User,
      as: 'Children',
      attributes: ['username', 'firstName', 'lastName'],
    }],
  })
  .then(parent => parent.toJSON())
