const router = require('express').Router();
// add ref to models as needed for routing
const { GroupList } = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage');

    // when user logs in, what do we want the homepage to show? Their lists and/or groups?
    

});

router.get('/group', async (req, res) => {
    res.render('groupPage');
});

router.get('/list', async (req, res) => {
    res.render('listPage');
});

router.get('/login', async (req, res) => {
    // send to homepage if logged in
        // if(req.session.loggedIn) {
        //     res.redirect('/');
        //     return;
        // }
    res.render('login');
});

module.exports = router;