'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users, Articles}) {
      this.hasMany(Articles, {foreignKey: 'order_id', as: 'articles'})
      this.belongsTo(Users, {foreignKey: 'order_id', as: 'order'})
    }
  }
  Orders.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DOUBLE,
      defaultValue:0
    },
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};