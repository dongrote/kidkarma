'use strict';
const io = require('./server');

exports = module.exports = (event, data) => {
  const server = io();
  if (server) {
    server.emit(event, data);
  }
};
