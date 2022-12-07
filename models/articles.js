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
    static associate({Comments,Invoices,Categories}) {
      this.belongsTo(Categories, {foreignKey: 'category_id', as: 'category'})
      this.hasMany(Comments,{foreignKey: 'article_id', as: 'comments', onDelete: 'cascade', hooks: true })
      this.hasMany(Invoices,{foreignKey: 'article_id', as: 'invoices', onDelete: 'cascade', hooks: true })
    }
  }
  Articles.init({
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    number_on_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Articles',
  });
  return Articles;
};