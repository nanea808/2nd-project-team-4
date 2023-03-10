module.exports = {
    //helper function to check whether a group is already connected to a list.
    list_group_checker: (groupsArray, thisGroupsId) => {
        //cycle through all of the groups the list is connected to.
        for (let index = 0; index < groupsArray.length; index++) {         
            //if the group we're checking is already connected, return true.
            if(groupsArray[index].id === thisGroupsId) return true;
        }
        return false;
    },

    check_user_group_access: (groupData, user_id) => {
        let user_belongs = false;
        for (const user in groupData.users) {
            if (groupData.users[user].id === user_id) {
              user_belongs = true;
            }
        }
        if (groupData.owning_user_id === user_id) {
            user_belongs = true;
        }
        return user_belongs;
    },

    test_ownership: (actualOwner, testingId) => {
        if(actualOwner === testingId) return true;
        return false;
    }
};