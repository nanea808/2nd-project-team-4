const router = require("express").Router();
const { User, List, Group, GroupUser, GroupList } = require("../models");
const passport = require("../utils/auth");

// will need to add Passport authentication eventually here
router.get("/", async (req, res) => {
  const user_id = 1;
  const groupData = await Group.findAll({
    where: {
      owning_user_id: user_id,
    },
  }).catch((err) => {
    res.json(err);
  });
  const groups = groupData.map((group) => group.get({ plain: true }));
  console.log(groups);
  res.render("homepage", { groups, loggedIn: req.session.loggedIn });
});

router.get("/group", async (req, res) => {
  res.render("groupPage", { loggedIn: req.session.loggedIn });
});

router.get("/list", async (req, res) => {
  res.render("listPage", { loggedIn: req.session.loggedIn });
});

router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
