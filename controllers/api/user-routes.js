const router = require('express').Router();
const {User, List, Group, GroupUser} = require('../../models');

// api/users endpoint

//get on all users.
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            //include: all lists they own, all groups they're a part of, and all groups they own.
            include: [
                {model: List}, 
                {model: Group}, 
                {model: Group, attributes: ['title'], through: {model: GroupUser, attributes: ['group_id', 'user_id'],}}
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
                {model: Group, attributes: ['title'], through: {model: GroupUser, attributes: ['group_id', 'user_id'],}}
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

//login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.fineOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userData) {
            res
                .status(400)
                .json({message: 'Email not found. Please try again.'});
            return;
        }

        const validPass = await userData.checkPassword(req.body.password);

        if (!validPass) {
            res
            .status(400)
            .json({message: 'Incorrect password. Please try again.'});
        return;
        }

        // set up session when user logs in
        req.session.save(() => {
            req.session.loggedIn = true;

            res
                .status(200)
                .json({user: userData, message: 'Logged in to Pear Present.'});
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err); //comment out when testing finished
    }
});

module.exports = router;