'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deliveries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      this.belongsTo(Users,{ foreignKey: 'user_id', as: 'user' })
    }
  }
  Deliveries.init({
    way_of_delivery: {
      type: DataTypes.STRING,
      allowNull:false
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false
    },
    total_price: {
      type: DataTypes.DOUBLE,
      defaultValue:0
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Deliveries',
  });
  return Deliveries;
};