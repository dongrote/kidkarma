'use strict';
exports = module.exports = require('express').Router();

const requireParent = require('../../../middleware/requireParent'),
  createMerit = require('./createMerit'),
  createDemerit = require('./createDemerit'),
  findKarma = require('./findKarma'),
  history = require('./history');

exports.post('/merit', requireParent, createMerit);
exports.post('/demerit', requireParent, createDemerit);
exports.get('/karma', findKarma);
exports.get('/history', history);
// exports.get('/merits', findAllMerits);
// exports.get('/demerits', findAllDemerits);
