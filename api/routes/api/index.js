'use strict';
exports = module.exports = require('express').Router();
const healthz = require('./healthz'),
  login = require('./login'),
  logout = require('./logout'),
  verifyJwt = require('../../middleware/verifyJwt'),
  relationships = require('./relationships'),
  children = require('./children'),
  merits = require('./merits'),
  demerits = require('./demerits');

exports.get('/healthz', healthz);
exports.post('/login', login);
exports.get('/logout', logout);

exports.use('/merits', merits);
exports.use('/demerits', demerits);
exports.use('/relationships', verifyJwt, relationships);
exports.use('/children', verifyJwt, children);
