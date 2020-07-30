'use strict';
exports = module.exports = require('express').Router();

const requireParent = require('../../../middleware/requireParent'),
  createGoodKarma = require('./createGoodKarma'),
  createBadKarma = require('./createBadKarma'),
  findKarma = require('./findKarma'),
  history = require('./history');

exports.post('/karma/good', requireParent, createGoodKarma);
exports.post('/karma/bad', requireParent, createBadKarma);
exports.get('/karma', findKarma);
exports.get('/history', history);
