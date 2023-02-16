const router = require('express').Router();
const {User, List, Item, Group, GroupList} = require('../../models');

// api/lists endpoint

router.get('/', async (req, res) => {
    try {
        const listData = await List.findAll({
            //include: the user the item belongs to, the items in the list, and all groups with the list.
            include: [
                {model: User}, 
                {model: Item}, 
                {model: Group, through: {model: GroupList}}
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
                {model: Group, through: {model: GroupList}}
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

//post to create a list
router.post('/', async (req, res) => {
    /*req.body should look something like this:
    {
        title: "something",
        user_id: 3,
        groupIds: [1,2,3]
    }
    */
    List.create(req.body)
        .then((list) => {
            if(req.body.groupIds) {
                const groupListIdArr = req.body.groupIds.map((group_id) => {
                    return {
                        list_id: list.id,
                        group_id
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

//delete to destroy a list
router.delete('/:id', async (req, res) => {
    try {
      const listData = await List.destroy({
        where: {id: req.params.id}
      });
  
      if(!listData) {
        res.status(404).json({message: 'No lists with that id.'});
        return;
      }
  
      res.status(200).json(listData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;