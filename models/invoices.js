'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Articles, Users}) {
      //this.hasMany(Articles)
      //this.hasMany(Users)
    }
  }
  Invoices.init({
    price: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Invoices',
  });
  return Invoices;
};