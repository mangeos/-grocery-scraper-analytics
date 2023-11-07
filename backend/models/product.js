"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      href: DataTypes.STRING,
      product: DataTypes.STRING,
      jmfPrice: DataTypes.DECIMAL, // DECIMAL with precision 5 and 2 decimal places
      energi1: DataTypes.DECIMAL,
      energi2: DataTypes.DECIMAL,
      fat: DataTypes.DECIMAL,
      saturatedFat: DataTypes.DECIMAL,
      carb: DataTypes.STRING,
      suger: DataTypes.DECIMAL,
      protein: DataTypes.DECIMAL,
      salt: DataTypes.DECIMAL,
    },
    {
      sequelize,
      tableName: "Products",
    }
  );

  return Product;
};
