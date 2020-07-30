'use strict';
const create = require('./create');

exports = module.exports = (name, description, karma) => create(name, description, -karma);
