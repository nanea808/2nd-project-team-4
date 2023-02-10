const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('homepage');
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