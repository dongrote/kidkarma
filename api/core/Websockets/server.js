'use strict';
const state = {server: null};

exports = module.exports = server => {
  if (server) {
    state.server = server;
  }
  return state.server;
};
