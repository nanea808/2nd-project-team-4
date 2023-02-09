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

// Each user has many groups.
// Each group belongs to one user (one owner).
User.hasMany(Group, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Group.belongsTo(User, {
    foreignKey: 'user_id'
});

// Each list has many items.
// Each item belongs to one list.
List.hasMany(Item, {
    foreignKey: 'list_id',
    onDelete: 'CASCADE'
});
Item.belongsTo(List, {
    foreignKey: 'list_id'
})

// Each user belongs to many groups.
User.belongsToMany(Group, {through: 'GroupUser'});
Group.belongsToMany(User, {through: 'GroupUser'});

// each list belongs to many groups, and each group is assigned to (belongs to) many lists.
List.belongsToMany(Group, {through: 'GroupList'});
Group.belongsToMany(List, {through: 'GroupList'});

module.exports = {
    Group,
    Item,
    List,
    User,
    GroupList,
    GroupUser
};