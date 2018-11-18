const Joi = require('joi');
 
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
//   res.render('login');
  res.send('This is login page');
});

router.post('/', function(req, res) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
  };

  // Validate the email and password
  var result = Joi.validate(req.body, schema);

  // Invalid login info
  if (result.error != null) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  var user = {
    id: Math.round(Math.random() * 100),
    email: req.body.email,
    password: req.body.password,
  };

  // Save user in session
  req.session.user = user;
  res.send("Login successfully!");

});

module.exports = router;
