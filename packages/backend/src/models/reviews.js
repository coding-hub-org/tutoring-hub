const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Stat = require('./stats');

// Create review schema and model
const ReviewSchema = new Schema({
    author: {
        type: String,
        default: "Anonymous"
    },
    course: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    statistics: Stat.schema,
    bookAgain: {
        type: Boolean,
        default: 0
    }
});

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;