const Joi = require('joi');
 
var express = require('express');
var router = express.Router();

/* GET setting page. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    // Need to login first
    res.redirect(403, '/login');
  }

  res.send('This is setting page\nYour email is ' + req.session.user.email);
});

module.exports = router;
