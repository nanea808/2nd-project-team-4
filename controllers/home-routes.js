const router = require('express').Router();

router.get('/', async (req, res) => {
    // res.render('homepage');
    // when user is logged in, homepage shows their wishlists (or should it show their groups?) 
});

router.get('/group', async (req, res) => {
    res.render('groupPage');
});

router.get('/list', async (req, res) => {
    res.render('listPage');
});

router.get('/login', async (req, res) => {
    // send to homepage if already logged in
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;