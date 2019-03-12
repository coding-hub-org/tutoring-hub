var express = require('express');
var router = express.Router();

const Tutor = require('../../../../models/tutors');

router.update('/:tutorID', (req, res, next) => {
    // Tutor.findById(req.params.tutorID, function (err, result) {
    //     res.json(err ? [] : result);
    // });
});

module.exports = router;