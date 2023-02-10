const sequelize = require('../config/connection');

const User = require('../models/user');
const Item = require('../models/Item');
const List = require('../models/list');
const Group = require('../models/Group');
const GroupList = require('../models/GroupList');
const GroupUser = require('../models/GroupUser');

const userDataSeed = require('./userData.json');
const itemDataSeed = require('./itemData.json');
const userListsSeed = require('./userLists.json');
const groupDataSeed = require('./groupData.json');
const groupListDataSeed = require('./groupListData.json');
const groupUserDataSeed = require('./groupUserData.json');

const seedDatabase = async () => {

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await User.bulkCreate(userDataSeed);
    await List.bulkCreate(userListsSeed);
    await Item.bulkCreate(itemDataSeed);
    await Group.bulkCreate(groupDataSeed);
    await GroupList.bulkCreate(groupListDataSeed);
    await GroupUser.bulkCreate(groupUserDataSeed);
    
    process.exit(0);
};

seedDatabase();