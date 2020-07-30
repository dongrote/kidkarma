'use strict';
const log = require('debug-logger')('core:Websockets:clientDisconnect');

exports = module.exports = (clientSocket, reason) => {
  log.info(`${clientSocket.id} disconnected: ${reason}`);
};
