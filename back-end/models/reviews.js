const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    overall: {
        type: Number
    }
});

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;