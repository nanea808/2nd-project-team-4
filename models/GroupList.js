// group lists = users' wish lists

const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class GroupList extends Model {}

//junction for the many-to-many relationship between group and list.
GroupList.init(
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
        list_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'list',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'group_list',
    }
);

module.exports = GroupList;