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
router.post('/', async (req, res) => {
    const express = require('express');
    const { User, Group, GroupUser } = require('../../models');

    try {
        const { title, memberEmail } = req.body;

        const user = await User.findOne({ where: { id: req.user.id } });
        const newGroup = await Group.create({ title, description, owning_user_id: user.id }); // Create a new instance of the Group model and associate it with the logged-in user

        const [member, created] = await User.findOrCreate({ where: { name: groupUser } }); // find or create a new instance of the User model based on the given member name. Should change to email instead but unsure if we want to create new user since we don't have a way to invite someone to join by email at this point.

        await newGroup.addUser(member); // associate the new group instance with the member (groupUser)

        res.status(200).send({ message: 'New group created successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to create new group' });
    }
    });
// });

    // create new list
    // function createList() {
    // };
    
    $('#new-group-btn').click(renderGroupForm);
    $('#new-list-btn').click(renderListForm);

    $('#new-group-save-btn').click(createGroup);
    // $('#new-list-save-btn').click(createList);

    $('#groups-col').children().eq(3).click(redirectGroup);
    $('#lists-col').children().eq(3).click(redirectList);
});