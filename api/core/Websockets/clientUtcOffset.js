'use strict';
const clients = require('./clients');

exports = module.exports = clientId => {
  const clientData = clients[clientId];
  return clientData ? clientData.utcOffset : 0;
};
