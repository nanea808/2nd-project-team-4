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
      // Needs Verification
      type: DataTypes.STRING,
      defaultValue: "unassigned",
      allowNull: false,
    },
    claimed_user: {
      //null or user_id (foreign key shouldn't be necessary)
      type: DataTypes.INTEGER,
      allowNull: true,
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
