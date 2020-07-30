'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KarmaAction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  KarmaAction.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.STRING,
    defaultKarmaValue: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'KarmaAction',
  });
  return KarmaAction;
};
