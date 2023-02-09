const Group = require('./Group');
const Item = require('./Item');
const List = require('./List');
const User = require('./User');

//junctions
const GroupList = require('./GroupList');
const GroupUser = require('./GroupUser');

// Each user has many lists.
// Each list belongs to one user.
User.hasMany(List, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
List.belongsTo(User, {
    foreignKey: 'user_id'
});

// Each group has many lists.
// each list belongs to many groups.
Group.hasMany(List, {
    foreignKey: 'group_id',
    onDelete: 'CASCADE'
});
List.belongsToMany(Group, {through: 'GroupList'});

// Each user has many groups.
// Each group belongs to one user (one owner).
User.hasMany(Group, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Group.belongsTo(User, {
    foreignKey: 'user_id'
});

// Each group has many users.
// Each user belongs to many groups.
Group.hasMany(User, {
    foreignKey: 'group_id',
    onDelete: 'CASCADE'
});
User.belongsToMany(Group, {through: 'GroupUser'});

// Each list has many items.
// Each item belongs to one list.
List.hasMany(Item, {
    foreignKey: 'list_id',
    onDelete: 'CASCADE'
});
Item.belongsTo(List, {
    foreignKey: 'list_id'
})

module.exports = {
    Group,
    Item,
    List,
    User,
    GroupList,
    GroupUser
};