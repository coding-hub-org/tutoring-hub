const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create friend schema and model
const TutorSchema = new Schema({
    fname: {
		type: String,
		required: [true, 'Name field is required']
	},
	lname: {
		type: String,
		required: [true, 'Name field is required']
    },
    courses: [{
        type: String
    }],
	rating: {
		type: Numbers
    },
    totalReviews: {
        type: Numbers
    }
});

const Tutor = mongoose.model('friend', TutorSchema);

module.exports = Tutor;
