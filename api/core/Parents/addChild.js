'use strict';
const models = require('../../db/models'),
  findById = require('./findById');

exports = module.exports = (ParentId, ChildId) => models.ParentChildRelationship
  .create({ParentId, ChildId})
  .then(() => findById(ParentId));
