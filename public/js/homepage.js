$(() => {
    const redirectGroup = (event) => {
        const element = event.target;
        
        if (element.matches("p")) {
            document.location = `/group/${element.dataset.groupId}`
            // console.log(element.dataset.groupId);
        }
    }

    const redirectList = (event) => {
        const element = event.target;
        
        if (element.matches("p")) {
            document.location = `/list/${element.dataset.listId}`
            // console.log(element.dataset.groupId);
        }
    }

    // show group and list add forms
    function renderGroupForm() {
        $('#addGroup-div').children().removeClass('visually-hidden');
    };
    
    function renderListForm() {
        $('#addList-div').children().removeClass('visually-hidden');
    };

    // create new group
    // const { Group, User, GroupUser, GroupList, List } = require('../../models');
    // const router = require('express').Router();

    // function createGroup() {
    //     const group_title = $('#group-title').val().trim();
    //     const groupUser = $('#groupUser-name').val().trim();
    //     // const email = $('#groupUser-email').val().trim(); // users need to be registered and logged in to look at their groups, but we don't currently have functionality to send email invites to users to join group and/or register if they don't already have an account. 

    //     router.post('/', async (req, res) => {
    //         const response = await Group.create(req.body, {
    //             where: {
    //                 owning_user_id: req.session.userID,
    //                 title: group_title,
    //             },
    //             include: [
    //                 { model: GroupUser, where: { user_id: groupUser } }, // how do we make sure group_id gets assigned to groupuser? where: group_id: this.req.id or something along those lines?
    //                 // { model: GroupList, through: { model: Group, where: { } } },
    //             ],
    //             // headers: {
    //             //     'Content-Type': 'application/json'
    //             // }
    //         });

    //         if (response.ok) {
    //             document.location.reload('/');
    //         } else {
    //             alert('Could not create new group.');
    //             console.log('Error: couldn not create new group.');
    //         }
    //     });
    // };

    // create new list
    // function createList() {
    // };
    
    $('#new-group-btn').click(renderGroupForm);
    $('#new-list-btn').click(renderListForm);

    // $('#new-group-save-btn').click(createGroup);
    // $('#new-list-save-btn').click(createList);

    $('#groups-col').children().eq(3).click(redirectGroup);
    $('#lists-col').children().eq(3).click(redirectList);
});