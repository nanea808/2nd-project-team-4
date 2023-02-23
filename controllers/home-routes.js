const router = require("express").Router();
const { User, List, Group, Item, GroupUser, GroupList } = require("../models");

//homepage. Includes all groups a user is a part of, and all lists the user has made.
//Page includes options to: login/logout, select a group, select a list, and create a list/group.
router.get("/", async (req, res) => {
  // Get groups based on logged in users ID
  if (req.session.loggedIn) {
    const groupData = await Group.findAll({
      where: {
        owning_user_id: req.session.userID,
      },
    }).catch((err) => {
      res.json(err);
    });
    const groups = groupData.map((group) => group.get({ plain: true }));

    // Get lists based on logged in users ID
    const listData = await List.findAll({
      where: {
        user_id: req.session.userID,
      },
    }).catch((err) => {
      res.json(err);
    });
    const lists = listData.map((list) => list.get({ plain: true }));

    res.render("homepage", { groups, lists, loggedIn: req.session.loggedIn });
  } else {
    res.render("login");
  }
});

//group page. Includes information for the selected group, including: the group owner and name along the top,
//a list of guests on the side with those guests' lists as selectable fields, and the items on the selected user's list in the center/right of the view.
//Owners have the option to add/remove users and delete the group. Users added to a group have to add a list to the group from the list page.
//There is a button to select a random item for a specified group member.
//Users have the option to change the status of a gift between unassigned, assigned, and purchased. List owners don't see the status of items on their list.
router.get("/group/:id", async (req, res) => {
  const groupData = await Group.findByPk(req.params.id, {
    include: [
      { model: User },
      { model: User, through: { model: GroupUser } },
      { model: List, through: { model: GroupList } },
    ],
  });
  const group = groupData.get({ plain: true });

  if (group.owning_user_id != req.session.userID) {
    res.send("You dont own this group.");
    return;
  }
  else res.render("groupPage", { group, loggedIn: req.session.loggedIn, userID: req.session.userID });
});

//list page. Includes information on the list the user selected from the homepage, including the list title and all groups with access to the list.
//users can add lists to groups that they're a part of.
//users can create and delete items on the list.
router.get("/list/:id", async (req, res) => {
  if(!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }

  const listData = await List.findByPk(req.params.id, {
      include: [
          {model: Item},
          {model: User},
          {model: Group, through: {model: GroupList}}
      ]
  }).catch((err) => {
      res.json(err);
  });

    const list = listData.get({ plain: true });

    if(req.session.userID !== list.user_id) {
      res.send(`You don't have access to that list.`);
      return;
    }
    else res.render("listPage", { list, loggedIn: req.session.loggedIn });
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
