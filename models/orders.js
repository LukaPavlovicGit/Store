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
    static associate({Users, Articles, Deliveries, Invoices}) {
      this.hasMany(Articles, {foreignKey: 'order_id', as: 'articles'})
      this.belongsTo(Users, {foreignKey: 'user_id', as: 'user'})
      this.belongsTo(Deliveries, {foreignKey: 'delivery_id', as: 'delivery'})
      this.belongsTo(Invoices, {foreignKey: 'invoice_id', as: 'invoice'})
    }
  }
  Orders.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    delivery_id: {
      type: DataTypes.INTEGER
    },
    invoice_id: {
      type: DataTypes.INTEGER
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