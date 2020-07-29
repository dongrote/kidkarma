'use strict';
require('dotenv').config();

const dialect = 'sqlite',
  storage = process.env.DBPATH || 'db.sqlite',
  seederStorage = 'sequelize',
  seederStorageTableName = 'SequelizeData';

exports = module.exports = {
  development: {dialect, storage, seederStorage, seederStorageTableName},
  test: {dialect, storage, seederStorage, seederStorageTableName},
  production: {dialect, storage, seederStorage, seederStorageTableName, logging: () => null},
};
