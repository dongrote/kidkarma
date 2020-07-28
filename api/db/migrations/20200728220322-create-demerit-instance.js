'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DemeritInstances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DemeritId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Demerits',
          key: 'id',
        },
      },
      ParentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Parents',
          key: 'id',
        },
      },
      ChildId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Children',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DemeritInstances');
  }
};
