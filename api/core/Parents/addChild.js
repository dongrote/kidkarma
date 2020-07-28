'use strict';
const models = require('../../db/models');

exports = module.exports = (ParentId, ChildId) => models.ParentChildRelationship
  .create({ParentId, ChildId})
  .then(() => null);
