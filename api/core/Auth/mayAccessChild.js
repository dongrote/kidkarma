'use strict';
const models = require('../../db/models');

exports = module.exports = (tokenPayload, ChildId) => tokenPayload.parent
  ? models.ParentChildRelationship
    .findOne({where: {ParentId: tokenPayload.id, ChildId}})
    .then(result => Boolean(result))
  : Promise.resolve(tokenPayload.id === ChildId);
