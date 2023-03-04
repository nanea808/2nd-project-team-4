const router = require("express").Router();
const { User, List, Group, GroupUser } = require("../../models");

// api/users endpoint

// get on all users disabled. Enable only for testing.
/*
  router.get("/", async (req, res) => {
    try {
      const userData = await User.findAll({
        include: [
          { model: List },
          { model: Group },
          { model: Group, through: { model: GroupUser } },
        ],
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  }); 
*/

// get on a user
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        { model: List },
        { model: Group },
        { model: Group, through: { model: GroupUser } },
      ],
    });

    if (!userData) {
      res.status(404).json({ message: "No user with that ID." });
      return;
    }

    if(req.params.id !== JSON.stringify(req.session.userID)) {
      res.status(500).json({message: "This is not you."});
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// User login routes

// Sign Up
// post to create a user
router.post("/", async (req, res) => {
  /*req.body should look something like this:
    {
        username: "something",
        password: "pass1234",
        email: foo@bar.com,
        groupIds: [1,2,3]
    }
    note: connecting through groupIds when posting a user is disabled to protect existing groups.
    */
  User.create(req.body)
    /* GroupUser connection on user create is disabled to protect existing groups. Enable only for seeding or testing.
      .then((user) => {
      if (req.body.groupIds) {
        const groupUserIdArr = req.body.groupIds.map((group_id) => {
          return {
            user_id: user.id,
            group_id,
          };
        });
        GroupUser.bulkCreate(groupUserIdArr);
      }
      return user;
    })*/
    .then((results) => {
      req.session.save(() => {
        req.session.userID = results.id;
        req.session.loggedIn = true;
        res.status(200).json(results);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//put to update a user
//delete to delete a user

//Login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again! 1" });
      return;
    }

    const passwordValid = userData.checkPassword(req.body.password);

    if (!passwordValid) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again! 2" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = userData.id;
      console.log("logged in");
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
