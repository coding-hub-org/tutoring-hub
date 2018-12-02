var express = require('express');
const Tutors = require('../models/tutors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TUTORS' });
});

module.exports = router;

