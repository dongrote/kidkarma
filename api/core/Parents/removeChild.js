'use strict';
const models = require('../../db/models');

exports = module.exports = (ParentId, ChildId) => models.ParentChildRelationship
  .destroy({where: {ParentId, ChildId}})
  .then(() => null);
