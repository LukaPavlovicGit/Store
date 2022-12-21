'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comments,Invoices,Categories,Orders}) {
      this.belongsTo(Categories, {foreignKey: 'category_id', as: 'category'})
      this.belongsTo(Orders, {foreignKey: 'order_id', as: 'order'})
      this.hasMany(Comments,{foreignKey: 'article_id', as: 'comments', onDelete: 'cascade', hooks: true })
    }
  }
  Articles.init({
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_id: {
      type: DataTypes.INTEGER,
      defaultValue: -1
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};