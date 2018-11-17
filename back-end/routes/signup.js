var express = require('express');
var router = express.Router();

/* GET signup page. */
router.get('/', function(req, res, next) {
//   res.render('signup', { });
  res.send('This is signup page');
});

// TODO POST request

module.exports = router;
