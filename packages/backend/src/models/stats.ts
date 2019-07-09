import mongoose, { Schema } from 'mongoose';

export const StatSchema = new Schema({
    methodology: {
        type: Number,
        default: 0
    },
    organization: {
        type: Number,
        default: 0
    },
    preparation: {
        type: Number,
        default: 0
    },
    clarity: {
        type: Number,
        default: 0
    },
    knowledge: {
        type: Number,
        default: 0
    }
});

export const Stat = mongoose.model("stat", StatSchema);