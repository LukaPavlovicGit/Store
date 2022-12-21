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
    static associate({Orders}) {
      this.hasMany(Orders, { foreignKey: 'delivery_id', as: 'orders'})
    }
  }
  Deliveries.init({
    delivery_date: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
  }, {
    sequelize,
    modelName: 'Deliveries',
  });
  return Deliveries;
};