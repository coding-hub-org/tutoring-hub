var express = require('express');
const Tutor = require('../models/tutors');
var router = express.Router();


router.use('/api/v1', require('./api/v1'));
// router.use('/api/v2', require('./api/v2'));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("This is the homepage of the server");
});


module.exports = router;