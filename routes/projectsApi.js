const router        = require('express').Router();
const controller    = require('../models/projectsController');

router.delete('/:id', controller.deleteProject, (req, res) => {
  res.sendStatus(200);
});

router.put('/:id', controller.update, (req, res) => {
  res.sendStatus(200);
});


router.get('/', controller.getAll, (req, res) => {
  res.json(res.projects);
});

router.post('/', controller.add, (req, res) => {
  res.sendStatus(200);
});

router.get('/search', controller.search, (req, res) => {
  res.json(res.project);
});


module.exports = router;
