'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeritInstance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MeritInstance.belongsTo(models.Merit);
      MeritInstance.belongsTo(models.Child);
      MeritInstance.belongsTo(models.Parent);
    }
  };
  MeritInstance.init({}, {
    sequelize,
    modelName: 'MeritInstance',
  });
  return MeritInstance;
};
