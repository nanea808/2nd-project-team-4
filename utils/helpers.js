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
};