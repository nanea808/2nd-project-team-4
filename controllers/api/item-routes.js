const router = require('express').Router();
const {List, Item} = require('../../models');

// api/items endpoint

// get on all items disabled. Enable only for testing.
/*
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
*/

router.get('/:id', async (req,res) => {
    try {
        const itemData = await Item.findByPk(req.params.id, {
            include: [{model: List}]
        });

        if(!itemData) {
            res.status(404).json({message: 'No item with that ID.'});
            return;
        }
        const serializedItem = itemData.get({plain: true});
        
        if(serializedItem.list.user_id !== req.session.userID) {
          res.status(401).json({message: "This item is not part of one of your lists. Please log in as the correct user."});
          return;
        }
        res.status(200).json(serializedItem);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
      const itemsList = await List.findByPk(req.body.list_id);
      if(itemsList.user_id !== req.session.userID) {
        res.status(401).json({message: "You don't own the list you're trying to add to. Please log in to the correct user."});
        return;
      }
      const itemData = await Item.create(req.body);
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const itemData = await Item.findByPk(req.params.id, {
        include: [{model: List}]
      });
      if(!itemData) {
        res.status(404).json({message: 'no item with that id.'});
        return;
      }
      
      const serializedItem = itemData.get({plain: true});
      if(serializedItem.list.user_id !== req.session.userID) {
        res.status(401).json({message: "This item is not part of one of your lists. Please log in as the correct user."});
        return;
      }
      const destroyItem = await Item.destroy({
        where: {id: req.params.id}
      });
      res.status(200).json(destroyItem);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;