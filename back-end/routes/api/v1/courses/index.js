const express = require('express');
const router = express.Router({
    mergeParams: true
});

var Tutor = require('../../../../models/tutors');

router.get('/', (req, res, next) => {
    let result = [];
    Tutor.find({}, function (err, tutors) {
        if (err) {
            console.log(err);
            return;
        }
        for (var tutor of tutors) {
            var courses = tutor.courses;
            for (var course of courses) {
                if (result.indexOf(course) === -1)
                    result.push(course);
            }
        }
        res.send(result);
    });
});

module.exports = router;