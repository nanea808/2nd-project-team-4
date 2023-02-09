const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class GroupUser extends Model {}

//junction for the many-to-many relationship between group and user.
GroupUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        group_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'group',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'group_user',
    }
);
      
    module.exports = GroupUser;
