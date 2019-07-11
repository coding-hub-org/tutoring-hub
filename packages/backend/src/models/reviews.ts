import mongoose, { Schema } from 'mongoose';
import { Stat } from './stats';

export const ReviewSchema = new Schema({
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

export const Review = mongoose.model('review', ReviewSchema);