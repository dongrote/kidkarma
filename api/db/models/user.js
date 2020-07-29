'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(User, {through: models.ParentChildRelationship, as: 'Children', foreignKey: 'ParentId'});
      User.belongsToMany(User, {through: models.ParentChildRelationship, as: 'Parents', foreignKey: 'ChildId'});
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    isParent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    passwordSalt: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
