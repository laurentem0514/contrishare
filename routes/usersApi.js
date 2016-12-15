const router        = require('express').Router();
const controller    = require('../models/usersController');

router.get('/search', controller.searchUsers, (req, res) => {
  res.json(res.data);
});

router.delete('/:id', controller.deleteUser, (req, res) => {
  res.sendStatus(200);
});

router.put('/:id', controller.update, (req, res) => {
  res.sendStatus(200);
});

router.get('/:id', controller.getOne, (req, res) => {
  res.json(res.user);
});

router.get('/', controller.getAll, (req, res) => {
  res.json(res.users);
});

router.post('/', controller.add, (req, res) => {
  res.sendStatus(200);
});



module.exports = router;
