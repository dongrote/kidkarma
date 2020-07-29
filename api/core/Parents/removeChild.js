'use strict';
const models = require('../../db/models'),
  findById = require('./findById');

exports = module.exports = (ParentId, ChildId) => models.ParentChildRelationship
  .destroy({where: {ParentId, ChildId}})
  .then(() => findById(ParentId));
