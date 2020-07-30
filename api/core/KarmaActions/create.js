'use strict';
const models = require('../../db/models');

exports = module.exports = (name, description, karma) => models.KarmaAction
  .create({name, description, defaultKarmaValue: karma})
  .then(row => row.toJSON());
