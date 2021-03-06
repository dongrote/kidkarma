'use strict';
exports = module.exports = require('express').Router();
const healthz = require('./healthz'),
  login = require('./login'),
  loggedIn = require('./loggedIn'),
  logout = require('./logout'),
  verifyJwt = require('../../middleware/verifyJwt'),
  relationships = require('./relationships'),
  children = require('./children'),
  karmaactions = require('./karmaactions'),
  user = require('./user');

exports.get('/healthz', healthz);
exports.post('/login', login);
exports.get('/logout', logout);
exports.get('/loggedIn', loggedIn);

exports.use('/karmaactions', karmaactions);
exports.use('/relationships', verifyJwt, relationships);
exports.use('/children', verifyJwt, children);
exports.use('/user', verifyJwt, user);
