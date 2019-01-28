const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews');

// Create tutor schema and model
const TutorSchema = new Schema({
    firstName: {
		type: String,
		required: [true, 'Name field is required']
	},
	lastName: {
		type: String,
		required: [true, 'Name field is required']
    },
    courses: [String],
    totalReviews: {
        type: Number,
        default: 0
    },
    reviews: [Review.schema],
});

const Tutor = mongoose.model('tutor', TutorSchema);

module.exports = Tutor;
