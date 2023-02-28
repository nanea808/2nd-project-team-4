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
    const express = require('express');
    const { User, Group } = require('../../models');
    
    // create new group
    router.post('/new-group', async (req, res) => {
        try {
            const { title, memberEmail } = req.body;
            const user = await User.findOne({ where: { id: req.user.id } });
            const newGroup = await Group.create({ title, owning_user_id: user.id }); // Create a new instance of Group and associate it with logged-in user... should req.session.userId be used instead here?
            
            // commenting out below because I think it'd make more sense to add group members from the group page instead.
            
            // const [member, created] = await User.findOrCreate({ // Find or create a new User model instance based on the group member's email
            //     where: { email: memberEmail },
            //     defaults: { name: memberEmail.split('@')[0], password: temp1234 } // Use the part before the @ symbol as the user's name if a new user is created and set temporary password (as workaround)
            //   }); // find or create a new instance of the User model based on provided email
            
            // await newGroup.addUser(member); // associate the new group instance with the group member/invitee
            
            await newGroup.save(); // save new group to db
            
            res.status(200).json({ message: 'New group created' });
        } catch (err) {
            res.status(500).json({ message: 'Failed to create new group' });
            res.status(err);
        }
    });

    // create new list
    router.post('/new-list', async (req, res) => {
        const listTitle = req.body; // I think it makes more sense to add items from the list page instead, so that leaves just a list title as the entire body
        
        if(!title) {
            return res.status(400).json({ message: 'Please enter a title for your list.'});
        };

        try {
            const user = await User.findByPk(req.user.id); 
            const newList = await List.create({ title });
            const listOwner = user.addList(newList);

            res.status(200).json({ message: 'New list saved'});
        } catch (err) {
            res.status(500).json({ message: 'Could not create new list'});
            res.status(err);
        }

        res.json(newList);
    });
    // };
    
    $('#new-group-btn').click(renderGroupForm);
    $('#new-list-btn').click(renderListForm);
        
    $('#groups-col').children().eq(3).click(redirectGroup);
    $('#lists-col').children().eq(3).click(redirectList);

});