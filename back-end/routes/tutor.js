var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const Tutor = require('../models/tutors');


// DELETE
////////////////////////////////////////////////////////////////////////////////////////

/* GET home page. */
router.post('/test', function(req, res, next) {
    Tutor.create(req.body).then(
        (tutor) => {
            res.send(tutor);
        }
    );
});

/* PUT update tutor */
router.put('/:id', function(req, res, next) {
    Tutor.findByIdAndUpdate({_id: req.params.id}, 
        { $push: { 'reviews':  req.body} })
    .then(() => {
        Tutor.findOne({_id: req.params.id})
        .then((tutor) => {
            res.send(tutor);
        })
    });
}); 
////////////////////////////////////////////////////////////////////////////////////////

router.get('/:id', (req, res, next) => {
    Tutor.findById(req.params.id).then((tutors) => {
        res.json(tutors);
    });
});

router.get('/:id/reviews', (req, res, next) => {
    res.send("USER WITH ID REVIEWS " + req.params.id);
});

router.get('/:id/rate', (req, res, next) => {
    res.send("SURVERY FOR TUTOR " + req.params.id);
});

router.post('/:id/rate', (req, res, next) => {
    res.send("SUBMIT SURVERY FOR TUTOR " + req.params.id);
});



module.exports = router;
