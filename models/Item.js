const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        //optional
        type: DataTypes.STRING
    },
    link: {
        //optional
        type: DataTypes.STRING
    },
    status: {
        //unassigned, assigned, purchased
        type: DataTypes.STRING,
        allowNull: false
    },

    //list owning the item
    list_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'list',
        key: 'id'
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
  }
);

module.exports = Item;
