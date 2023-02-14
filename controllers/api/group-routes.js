const router = require('express').Router();
const {User, List, Group, GroupUser, GroupList} = require('../../models');

// api/groups endpoint

router.get('/', async (req, res) => {
    try {
        const groupData = await Group.findAll({
            //include: the owner of the group, the members of the group, the lists in each group
            include: [
                {model: User},
                {model: User, through: {model: GroupUser}},
                {model: List, through: {model: GroupList}}
            ]
        });
        res.status(200).json(groupData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const groupData = await Group.findByPk(req.params.id, {
            include: [
                {model: User},
                {model: User, through: {model: GroupUser}},
                {model: List, through: {model: GroupList}}
            ]
        });

        if(!groupData) {
            res.status(404).json({message: 'No group with that ID.'});
            return;
        }
        res.status(200).json(groupData);
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
    Group.create(req.body)
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
        .then((results) => res.status(200).json(results))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
  });

//put to update a group (change name)
//delete to delete a group

module.exports = router;
