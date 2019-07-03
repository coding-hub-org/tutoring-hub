var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    // Need to login first
    res.redirect(302, '/login');
  }

  // Clear session 
  req.session.destroy();

  // Redirect to index
  res.redirect('/');
});

module.exports = router;
