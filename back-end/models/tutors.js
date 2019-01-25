const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews');
const Stat = require('./stats');

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
	rating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    reviews: [Review.schema],
    statistics: Stat.schema
});

const Tutor = mongoose.model('tutor', TutorSchema);

module.exports = Tutor;
