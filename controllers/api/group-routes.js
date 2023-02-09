const router = require('express').Router();
const {User, List, Group, GroupUser, GroupList} = require('../../models');

//get on all groups.
router.get('/', async (req, res) => {
    try {
        const groupData = await Group.findAll({
            //include: the owner of the group, the members of the group, the lists in each group
            include: [
                {model: User},
                {model: User, attributes: ['username'], through: {model: GroupUser, attributes: ['group_id', 'user_id'],}},
                {model: List, attributes: ['title'], through: {model: GroupList, attributes: ['group_id', 'list_id'],}}
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
                {model: User, attributes: ['username'], through: {model: GroupUser, attributes: ['group_id', 'user_id'],}},
                {model: List, attributes: ['title'], through: {model: GroupList, attributes: ['group_id', 'list_id'],}}
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

module.exports = router;