'use strict';
const models = require('../../db/models');

exports = module.exports = username => models.Parent
  .findOne({
    where: {username},
    attributes: ['username', 'firstName', 'lastName'],
    include: [{
      model: models.Child,
      attributes: ['username', 'firstName', 'lastName'],
    }],
  })
  .then(parent => parent.toJSON())
