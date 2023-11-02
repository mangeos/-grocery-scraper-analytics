"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  /*
    const today = new Date();
  const formattedDate = `${today.getFullYear()}${
    today.getMonth() + 1
  }${today.getDate()}`;
*/
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  // const tableName = `Product_${formattedDate}`;
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Säg till databasen att detta fält ska autoinkrementeras
        allowNull: false, // Fältet får inte vara null
      },
      href: DataTypes.STRING,
      product: DataTypes.STRING,
      jmfPrice: DataTypes.DECIMAL,
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
