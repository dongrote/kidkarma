'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DemeritInstance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DemeritInstance.belongsTo(models.Demerit);
      DemeritInstance.belongsTo(models.User, {as: 'Child'});
      DemeritInstance.belongsTo(models.User, {as: 'Parent'});
    }
  };
  DemeritInstance.init({}, {
    sequelize,
    modelName: 'DemeritInstance',
  });
  return DemeritInstance;
};
