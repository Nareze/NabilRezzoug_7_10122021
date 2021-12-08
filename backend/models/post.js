'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.User.belongsToMany(models.Message, {
        through: models.Post,
        foreignKey: "UserId",
      });
      models.Message.belongsToMany(models.User, {
        through: models.Post,
        foreignKey: "idMessages",
      });
      models.Post.belongsTo(models.User, {
        foreignKey: "idMessages",
        as: "message",
        onDelete: "cascade",
        hooks: true,
      });
      models.Post.belongsTo(models.Message, {
        foreignKey: "UserId",
        as: "user",
        onDelete: "cascade",
        hooks: true,
      });

    }
  };
  Post.init({
    UserId: DataTypes.INTEGER,
    idMessages: DataTypes.INTEGER,
    content: DataTypes.STRING,
    onDelete: 'cascade'
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};