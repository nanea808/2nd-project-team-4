const router = require('express').Router();
const {GroupList} = require('../../models');

// /api/groupList endpoint

//post route to add a list to a group.
router.post('/', async (req, res) => {
    /*req.body should look something like this:
    {
        list_id: 1,
        group_id: 3
    }
    */
    GroupList.create(req.body)
        .then((results) => res.status(200).json(results))
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
  });

module.exports = router;