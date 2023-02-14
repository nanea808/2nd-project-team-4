const router = require('express').Router();
const {User, List, Group, GroupUser} = require('../../models');

// api/users endpoint

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            //include: all lists they own, all groups they're a part of, and all groups they own.
            include: [
                {model: List}, 
                {model: Group}, 
                {model: Group, through: {model: GroupUser}}
            ]
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {model: List}, 
                {model: Group},
                {model: Group, through: {model: GroupUser}}
            ]
        });

        if(!userData) {
            res.status(404).json({message: 'No user with that ID.'});
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
router.post('/', async (req, res) => {
    /*req.body should look something like this:
    {
        username: "something",
        password: "pass1234",
        email: foo@bar.com,
        groupIds: [1,2,3]
    }
    */
    User.create(req.body)
        .then((user) => {
            if(req.body.groupIds) {
                const groupUserIdArr = req.body.groupIds.map((group_id) => {
                    return {
                        user_id: user.id,
                        group_id
                    };
                });
                GroupUser.bulkCreate(groupUserIdArr);
            }
            return true;
        })
        .then((results) => {
            req.session.save(() => {
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



module.exports = router;