'use strict';
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('product_development', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  href: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jmfPrice: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  energi1: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  energi2: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  fat: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  saturatedFat: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  carb: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  suger: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  protein: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  salt: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
});

module.exports = {Product, sequelize};
