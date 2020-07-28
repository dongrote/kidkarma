'use strict';
exports = module.exports = require('express').Router();
const api = require('./api');
exports.use('/api', api);
