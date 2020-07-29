'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParentChildRelationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ParentChildRelationship.belongsTo(models.User, {as: 'Child'});
      ParentChildRelationship.belongsTo(models.User, {as: 'Parent'});
    }
  };
  ParentChildRelationship.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ParentChildRelationship',
  });
  return ParentChildRelationship;
};
