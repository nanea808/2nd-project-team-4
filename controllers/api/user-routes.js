const router = require('express').Router();
const {User, List, Group, GroupUser} = require('../../models');

// api/users endpoint

//get on all users.
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            //include: all lists they own, all groups they're a part of, and all groups they own.
            include: [{model: List}, {model: Group, through: GroupUser}, {model: Group}]
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{model: List}, {model: Group, through: GroupUser}, {model: Group}]
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