'use strict';
exports = module.exports = require('express').Router();

const findAllKarmaActions = require('./findAll'),
  findAllGoodKarmaActions = require('./findAllGood'),
  findAllBadKarmaActions = require('./findAllBad'),
  findAllMostRecentlyUsed = require('./recent');

exports.get('/', findAllKarmaActions);
exports.get('/good', findAllGoodKarmaActions);
exports.get('/bad', findAllBadKarmaActions);
exports.get('/recent', findAllMostRecentlyUsed);
