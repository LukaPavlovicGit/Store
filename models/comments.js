'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Articles}) {
      this.belongsTo(Users,{ foreignKey: 'user_id', as: 'user' })
      this.belongsTo(Articles, { foreignKey: 'article_id', as: 'article' })
    }
  }
  Comments.init({
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};