var express = require('express');
const Tutor = require('../models/tutors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.course) {
    //const course = req.query.course.toUpperCase();
    Tutor.find({courses: { "$in" : [req.query.course]}}).then((tutors) => {
      res.json(tutors);
    });
  } else {
    Tutor.find({}).then((tutors) => {
      res.json(tutors);
    });
  }
});


module.exports = router;

