const router = require('express').Router();
const groupRoutes = require('./group-routes');
const itemRoutes = require('./item-routes');
const listRoutes = require('./list-routes');
const userRoutes = require('./user-routes');
const groupListRoutes = require('./groupList-route');

router.use('/groups', groupRoutes);
router.use('/items', itemRoutes);
router.use('/lists', listRoutes);
router.use('/users', userRoutes);
router.use('/groupList', groupListRoutes);

module.exports = router;
