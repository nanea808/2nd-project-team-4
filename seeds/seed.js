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
    await sequelize.sync({ force: true });

    await User.bulkCreate(userDataSeed);
        await Item.bulkCreate(itemDataSeed);
            await List.bulkCreate(userListsSeed);
                await Group.bulkCreate(groupDataSeed);
                    await GroupList.bulkCreate(groupListDataSeed);
                        await GroupUser.bulkCreate(groupUserDataSeed);
    
    process.exit(0);
};

seedDatabase();