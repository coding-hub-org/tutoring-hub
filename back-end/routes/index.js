var express = require('express');
const Tutor = require('../models/tutors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Tutor.find({}).then((tutors) => {
      res.json(tutors);
  });
  // res.render('index', { title: 'TUTORS' });
});

module.exports = router;

