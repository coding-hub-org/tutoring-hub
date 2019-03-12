var express = require('express');
var router = express.Router();

const Tutor = require('../../../../models/tutors');

router.post('/remove/:tutorID', function (req, res, next) {
    Tutor.find({
        _id: req.params.tutorID
    }).deleteOne().exec(function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        res.send("Removed tutor with id: " + req.params.tutorID);
    });
});

router.get('/remove/:tutorID', function (req, res, next) {
    Tutor.find({
        _id: req.params.tutorID
    }, function (err, docs) {
        if (!docs) {
            res.send("Unable to find tutor with id: " + req.params.tutorID);
            return;
        }
        res.send("Removed tutor with id: " + req.params.tutorID + "<br><br>" + docs);
    });
});

module.exports = router;