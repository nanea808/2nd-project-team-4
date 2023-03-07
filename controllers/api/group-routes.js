const router = require('express').Router();
const {User, List, Group, GroupUser, GroupList} = require('../../models');
const { check_user_group_access } = require('../../utils/helpers');

// api/groups endpoint

// get on all groups disabled. Only enable for testing.
/*
    router.get('/', async (req, res) => {
        try {
            const groupData = await Group.findAll({
                //include: the owner of the group, the members of the group, the lists in each group
                include: [
                    {model: User, through: {model: GroupUser}},
                    {model: List, through: {model: GroupList}}
                ]
            });
            res.status(200).json(groupData);
        } catch (err) {
            res.status(500).json(err);
        }
    });
*/

router.get('/:id', async (req,res) => {
    try {
        const groupData = await Group.findByPk(req.params.id, {
            include: [
                {model: User, through: {model: GroupUser}, attributes: {exclude: ['password','email']} },
                {model: List, through: {model: GroupList}}
            ]
        });

        if(!groupData) {
            res.status(404).json({message: 'No group with that ID.'});
            return;
        }

        let group = groupData.get({ plain: true });

        if(!check_user_group_access(group, req.session.userID)) {
            res.status(401).json({ message: "You don't have access to this group." });
            return;
        }

        res.status(200).json(group);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post to create a group
router.post('/', async (req, res) => {
    /*req.body should look something like this:
    {
        title: "something",
        description: "this is optional",
        owning_user_id: 1,
        userIds: [1,2,3,4],
        listIds: [1.2.4.5]
    }
    */
   if(req.body.owning_user_id !== req.session.userID) {
    res.status(401).json({ message: "Please log in as the user woh will own this group." });
    return;
   }
    Group.create(req.body)
        // GroupUser and GroupList creates deactivated to protect existing users/lists. Disable only for testing, or
        // if a feature is added for initializing with selected users from a friendslist, or a user's chosen list.
        /*
            .then((group) => {
                if(req.body.userIds) {
                    const groupUserIdArr = req.body.userIds.map((user_id) => {
                        return {
                            group_id: group.id,
                            user_id
                        };
                    });
                    GroupUser.bulkCreate(groupUserIdArr);
                }
                if(req.body.listIds) {
                    const groupListIdArr = req.body.listIds.map((list_id) => {
                        return {
                            group_id: group.id,
                            list_id
                        };
                    });
                    GroupList.bulkCreate(groupListIdArr);
                }
                return true;
            })
        */
        .then((results) => res.status(200).json(results))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
  });

//put to update a group (change name, add/remove users.)
router.put("/:id", async (req, res) => {
    try {
      const thisGroup = await Group.findByPk(req.params.id, {
        include: [
            { model: User, through: { model: GroupUser }, attributes: {exclude: ['password','email']}},
            { model: List, through: { model: GroupList }},
          ],
      });
      if(!thisGroup) {
        res.status(404).json({message: "There are no groups with that ID."});
        return;
      }
      if(thisGroup.owning_user_id !== req.session.userID) {
        res.status(401).json({message: "You don't own this group. Please log in as the correct user."});
        return;
      }
  
      if (req.body.removedUser) {
        await GroupUser.destroy({
            where: { group_id: req.params.id, user_id: req.body.removedUser },
          });
        for (let index = 0; index < thisGroup.lists.length; index++) {
            if(thisGroup.lists[index].user_id == req.body.removedUser) {
                await GroupList.destroy({
                    where: { group_id: req.params.id, list_id: thisGroup.lists[index].id}
                });
            }
        }
      }
      if (req.body.newUser) {
        let userData = await User.findOne({
          where: {
            email: req.body.newUser
          },
        });
        if(!userData) {
          res.status(400).json({message: 'no user found with that email.'});
          return;
        }
        const user = userData.get({ plain: true });
        for (let index = 0; index < thisGroup.users.length; index++) {
          if(thisGroup.users[index].id === user.id) {
            res.status(400).json({message: 'This user is already part of your group.'});
            return;
          }
        }
        await GroupUser.create({group_id: req.params.id, user_id: user.id});
      }
      if (req.body.newTitle) {
        const groupData = await Group.update(
          { title: req.body.newTitle },
          { where: { id: req.params.id } }
        );
        res.status(200).json(groupData);
      } else
        res.status(200).json({message: `Group users and lists updated.`});
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete to delete a group
router.delete("/:id", async (req, res) => {
    try {
      const thisGroupData = await Group.findByPk(req.params.id);
      if(thisGroupData.owning_user_id !== req.session.userID) {
        res.status(401).json({ message: "This is not your group. Please log in as the group's owner." });
        return;
      }
      await GroupUser.destroy({
        where: {group_id: req.params.id},
      });
      await GroupList.destroy({
        where: {group_id: req.params.id},
      });
      const groupData = await Group.destroy({
        where: [ 
            { id: req.params.id },
            {owning_user_id: req.session.userID}
         ]
      });
  
      if (!groupData) {
        res.status(404).json({ message: "No groups with that id." });
        return;
      }
  
      res.status(200).json(groupData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
