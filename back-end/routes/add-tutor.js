var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

const Tutor = require('../models/tutors');

////////////////////////////////////////////////////////////////////////////////////////

router.post('/', function (req, res, next) {
    Tutor.create(req.body).then(
        (tutor) => {
            res.send(tutor);
        }
    );
});

////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;