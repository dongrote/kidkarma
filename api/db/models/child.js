'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Child extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Child.belongsToMany(models.Parent, {through: models.ParentChildRelationship});
      Child.hasMany(models.MeritInstance);
      Child.hasMany(models.DemeritInstance);
    }
  };
  Child.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    passwordSalt: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Child',
  });
  return Child;
};
