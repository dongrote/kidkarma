'use strict';
const clients = require('./clients'),
  log = require('debug-logger')('core:Websockets:clientConnect');

exports = module.exports = clientSocket => {
  log.info(`${clientSocket.id} connected`);
  clients[clientSocket.id] = {socket: clientSocket, utcOffset: 0};
  clientSocket.emit('utcOffset', null, utcOffset => {
    log.debug(`${clientSocket.id} utcOffset ${utcOffset}`);
    clients[clientSocket.id].utcOffset = utcOffset;
  });
};
