'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {                 // un message devra faire reference à un user
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',        // après suppresion d'un utilisateur, ses messages devront être supprimés
        onDelete: 'CASCADE',
      },
      titre: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      contenu: {
        type: Sequelize.STRING
      },
      isLike: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Messages');
  }
};