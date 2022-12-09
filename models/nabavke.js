'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Nabavke extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nabavke.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Nabavke',
  })
  return Nabavke
}