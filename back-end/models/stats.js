const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create stats shema and model
const StatSchema = new Schema({
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

const Stat = mongoose.model("stat", StatSchema);

module.exports = Stat;