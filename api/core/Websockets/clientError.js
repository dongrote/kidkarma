'use strict';
const log = require('debug-logger')('core:Websockets:clientError');

exports = module.exports = (clientSocket, error) => log.error(`${clientSocket.id} error:`, error);
