'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reclamations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Articles,Users}) {
      this.belongsTo(Users,{ foreignKey: 'user_id', as: 'user' })
      this.belongsTo(Articles,{ foreignKey: 'article_id', as: 'article' })
    }
  }
  Reclamations.init({
    description: {
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
    modelName: 'Reclamations',
  });
  return Reclamations;
};