const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
      type: DataTypes.TEXT,
    },
    link: {
      //optional
      type: DataTypes.STRING,
    },
    status: {
      //unassigned, assigned, purchased
      type: DataTypes.STRING,
      defaultValue: "unassigned",
      allowNull: false,
    },
    claimed_user: {
      //unnasigned or user_id (foreign key shouldn't be necessary)
      type: DataTypes.INTEGER
    },
    //list owning the item
    list_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "list",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "item",
  }
);

module.exports = Item;
