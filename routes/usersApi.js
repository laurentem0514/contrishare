const router        = require('express').Router();
const controller    = require('../models/usersController');


router.get('/', controller.getAll, (req, res) => {
  res.json(res.users);
});

//this saves object from the req to the db
router.post('/', controller.add, (req, res) => {
  res.sendStatus(200);
});

router.delete('/:id', controller.deleteUser, (req, res) => {
  res.sendStatus(200);
});


module.exports = router;