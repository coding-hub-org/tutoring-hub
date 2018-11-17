var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
//   res.render('login');
  res.send('This is login page');
});

// TODO POST request


module.exports = router;
