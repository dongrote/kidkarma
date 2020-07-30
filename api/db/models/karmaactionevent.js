'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KarmaActionEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KarmaActionEvent.belongsTo(models.KarmaAction);
      KarmaActionEvent.belongsTo(models.User, {as: 'Child'});
      KarmaActionEvent.belongsTo(models.User, {as: 'Parent'});
    }
  };
  KarmaActionEvent.init({
    karma: DataTypes.INTEGER,
    remarks: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'KarmaActionEvent',
  });
  return KarmaActionEvent;
};
