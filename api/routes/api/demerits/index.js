'use strict';
exports = module.exports = require('express').Router();

const findAllMerits = require('./findAll'),
  findAllMostRecentlyUsed = require('./recent');

exports.get('/', findAllMerits);
exports.get('/recent', findAllMostRecentlyUsed);
