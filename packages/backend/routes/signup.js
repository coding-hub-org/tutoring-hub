const Joi = require('joi');

var express = require('express');
var router = express.Router();

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.send('This is signup page');
});

// TODO POST request
router.post('/', function(req, res) {
  const schema = {
    id: Joi.any(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
    confirm: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
  }

  // Validate the email and password
  var result = Joi.validate(user, schema);

  // Invalid signup info
  if (result.error != null) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  var user = {
    id: Math.round(Math.random() * 100),
    email: req.body.email,
    password: req.body.password,
    confirm: req.body.confirm,
  };

  // TODO Insert user object to MongoDB
  // TODO Handle insert into database error

  // Everything works fine, redirect to login page.
  res.redirect(201, '/login');

});

module.exports = router;
