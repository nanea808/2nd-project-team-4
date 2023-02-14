const router = require('express').Router();
const { User, List, Group, GroupUser, GroupList } = require('../models');

router.get('/', async (req, res) => {
    const user_id = 1;
    const groupData = await Group.findAll({
        where: {
            owning_user_id: user_id
        }
    }).catch((err) => {
        res.json(err);
    });
    const groups = groupData.map((group) => group.get({ plain: true }));
    console.log(groups);
    res.render('homepage', { groups });
});

router.get('/group', async (req, res) => {
    res.render('groupPage');
});

router.get('/list', async (req, res) => {
    res.render('listPage');
});

router.get('/login', async (req, res) => {
    res.render('login');
});

module.exports = router;