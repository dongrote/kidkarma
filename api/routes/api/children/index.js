'use strict';
exports = module.exports = require('express').Router();

const requireParent = require('../../../middleware/requireParent'),
  createMerit = require('./createMerit'),
  createDemerit = require('./createDemerit'),
  findKarma = require('./findKarma');

exports.post('/merit', requireParent, createMerit);
exports.post('/demerit', requireParent, createDemerit);
exports.get('/karma', findKarma);
// exports.get('/merits', findAllMerits);
// exports.get('/demerits', findAllDemerits);
