
const router        = require('express').Router();
const controller    = require('../models/contribController');

router.delete('/:id', controller.deleteContrib, (req, res) => {
  res.sendStatus(200);
});

router.put('/:id', controller.update, (req, res) => {
  res.sendStatus(200);
});

router.get('/search', controller.search, (req, res) => {
  res.json(res.contrib);
});

router.get('/', controller.getAll, (req, res) => {
  res.json(res.contribs);
});

router.post('/', controller.add, (req, res) => {
  res.sendStatus(200);
});




module.exports = router;
