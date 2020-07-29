'use strict';
exports = module.exports = require('express').Router();

const requireParent = require('../../../middleware/requireParent'),
  createRelationship = require('./create'),
  findAll = require('./findAll');

exports.post('/', requireParent, createRelationship);
exports.get('/', findAll);
