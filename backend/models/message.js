'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          foreignKey: "UserId",         // ajouter la foreign key
          onDelete: 'cascade',
          hooks: true,
        }
      });
    }
  };
  Message.init({
    UserId: DataTypes.INTEGER,        // ajouter la foreign key
    titre: DataTypes.STRING,
    image: DataTypes.STRING,
    contenu: DataTypes.STRING,
    isLike: DataTypes.BOOLEAN,
    // onDelete: 'cascade'
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};