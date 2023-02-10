const router = require('express').Router();
const {User, List, Item, Group, GroupList} = require('../../models');

//get on all lists.
router.get('/', async (req, res) => {
    try {
        const listData = await List.findAll({
            //include: the user the item belongs to, the items in the list, and all groups with the list.
            include: [
                {model: User}, 
                {model: Item}, 
                {model: Group, attributes: ['title'], through: {model: GroupList, attributes: ['group_id', 'list_id'],}}
            ]
        });
        res.status(200).json(listData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const listData = await List.findByPk(req.params.id, {
            include: [
                {model: User}, 
                {model: Item}, 
                {model: Group, attributes: ['title'], through: {model: GroupList, attributes: ['group_id', 'list_id'],}}
            ]
        });

        if(!listData) {
            res.status(404).json({message: 'No list with that ID.'});
            return;
        }
        res.status(200).json(listData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;