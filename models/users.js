'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comments,Invoices,Orders,Reclamations,Vouchers}) {
      this.hasMany(Comments, {foreignKey: 'user_id', as: 'comments', onDelete: 'cascade', hooks: true })
      this.hasMany(Orders, {foreignKey: 'user_id', as: 'orders'})
      this.hasMany(Reclamations, {foreignKey: 'user_id', as: 'reclamations'})
      this.hasMany(Vouchers, {foreignKey: 'user_id', as: 'vouchers'})
    }
  }
  Users.init({
    role:{
      type: DataTypes.STRING,
      defaultValue:"CLIENT"
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    number_of_purchases: {
      type: DataTypes.INTEGER,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};