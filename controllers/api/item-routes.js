const router = require('express').Router();
const {List, Item} = require('../../models');

// api/items endpoint

router.get('/', async (req, res) => {
    try {
        const itemData = await Item.findAll({
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

router.post('/', async (req, res) => {
    try {
      const itemData = await Item.create(req.body);
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const itemData = await Item.destroy({
        where: {id: req.params.id}
      });
      if(!itemData) {
        res.status(404).json({message: 'no tag with that id.'});
        return;
      }
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;