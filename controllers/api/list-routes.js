const router = require("express").Router();
const { User, List, Item, Group, GroupList } = require("../../models");

// api/lists endpoint

// Get on all lists disabled. Only enable for testing purposes.
/*
router.get("/", async (req, res) => {
  try {
    const listData = await List.findAll({
      //include: the user the item belongs to, the items in the list, and all groups with the list.
      include: [
        { model: User },
        { model: Item },
        { model: Group, through: { model: GroupList } },
      ],
    });
    res.status(200).json(listData);
  } catch (err) {
    res.status(500).json(err);
  }
});*/

router.get("/:id", async (req, res) => {
  try {
    const listData = await List.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Item },
        { model: Group, through: { model: GroupList } },
      ],
    });

    if (!listData) {
      res.status(404).json({ message: "No list with that ID." });
      return;
    }
    if (listData.user_id !== req.session.userID) {
      res.status(401).json({message: "This is not your list. Please log in as the correct user."});
      return;
    }
    res.status(200).json(listData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post to create a list
router.post("/", async (req, res) => {
  /*req.body should look something like this:
    {
        title: "something",
        user_id: 3,
        groupIds: [1,2,3]
    }
    */
  List.create(req.body)
    // initializing a list with GroupLists is disabled to protect existing groups. Enable only for testing.
    /*
      .then((list) => {
        if (req.body.groupIds) {
          const groupListIdArr = req.body.groupIds.map((group_id) => {
            return {
              list_id: list.id,
              group_id,
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

// Put on a list.
// Can remove from a group, and change the list title.
router.put("/:id", async (req, res) => {
  try {
    const thisList = await List.findByPk(req.params.id);
    if(thisList.user_id !== req.session.userID) {
      res.status(401).json({message: "This is not your list. Please log in as the correct user."});
      return;
    }

    if (req.body.removedGroup) {
      await GroupList.destroy({
        where: { group_id: req.body.removedGroup, list_id: req.params.id },
      });
    }
    if (req.body.title) {
      const listData = await List.update(
        { title: req.body.title },
        { where: { id: req.params.id } }
      );
      res.status(200).json(listData);
    } else
      res.status(200).json({message: `group with ID ${req.body.removedGroup} removed from this list.`});
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete to destroy a list
router.delete("/:id", async (req, res) => {
  try {
    const thisList = await List.findByPk(req.params.id);

    if(thisList.user_id !== req.session.userID) {
      res.status(401).json({message: "This is not your list. Please log in as the correct user."});
      return;
    }

    await Item.destroy({
      where: { list_id: req.params.id },
    });
    await GroupList.destroy({
      where: { list_id: req.params.id },
    });
    const listData = await List.destroy({
      where: { id: req.params.id },
    });

    if (!listData) {
      res.status(404).json({ message: "No lists with that id." });
      return;
    }

    res.status(200).json(listData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
