const router        = require('express').Router();
const controller    = require('../models/techController');


router.get('/suggestions', controller.getSuggestions, (req, res) => {
  console.log(res.suggestions);
  res.json(res.suggestions);
});


router.get('/', controller.getAll, (req, res) => {
  res.json(res.techs);
});

//this saves object from the req to the db
router.post('/', controller.add, (req, res) => {
  res.sendStatus(200);
});


module.exports = router;
