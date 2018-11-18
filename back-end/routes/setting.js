const Joi = require('joi');
 
var express = require('express');
var router = express.Router();

/* GET setting page. */
router.get('/', function(req, res, next) {
//   res.render('login');

  if (!req.session.user) {
      res.send("Please login first");
  }

  res.send('This is setting page\nYour email is ' + req.session.user.email);
});

// TODO POST request
// router.post('/', function(req, res) {
//   const schema = {
//     email: Joi.string().email({ minDomainAtoms: 2 }),
//     password: Joi.string().regex('/[a-zA-Z0-9]{6,30}/')
//   };

//   console.log(user);

// });

module.exports = router;
