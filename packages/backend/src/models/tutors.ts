import mongoose, { Schema } from 'mongoose';
import { Review } from './reviews';

// Create tutor schema and model
export const TutorSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Name field is required']
    },
    lastName: {
        type: String,
        required: [true, 'Name field is required']
    },
    imageUrl: {
        type: String,
    },
    imageID: {
        type: String,
    },
    major: {
        type: String
    },
    since: {
        type: String
    },
    courses: [String],
    reviews: [Review.schema],
});

export const Tutor = mongoose.model('tutor', TutorSchema);