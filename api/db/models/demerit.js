'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Demerit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Demerit.hasMany(models.DemeritInstance);
    }
  };
  Demerit.init({
    shortDescription: DataTypes.STRING,
    fullDescription: DataTypes.STRING,
    karmaValue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Demerit',
  });
  return Demerit;
};
