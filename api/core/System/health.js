'use strict';
const os = require('os'),
  temp = require('./temp'),
  memory = require('./memory');

exports = module.exports = () => temp()
  .then(thermal => ({
    thermal,
    memory: memory(),
    loadavg: os.loadavg(),
    uptime: os.uptime(),
  }));
