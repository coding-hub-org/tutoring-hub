const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create friend schema and model
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
    }
});

const Tutor = mongoose.model('tutor', TutorSchema);

module.exports = Tutor;
