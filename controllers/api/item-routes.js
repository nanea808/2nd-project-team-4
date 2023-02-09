const router = require('express').Router();
const {List, Item} = require('../../models');

//get on all items.
router.get('/', async (req, res) => {
    try {
        const itemData = await Item.findAll({
            //include: the list the item belongs to
            include: [{model: List}]
        });
        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const itemData = await Item.findByPk(req.params.id, {
            include: [{model: List}]
        });

        if(!itemData) {
            res.status(404).json({message: 'No item with that ID.'});
            return;
        }
        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;