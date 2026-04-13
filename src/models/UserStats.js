const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    postCount: {
        type: Number,
        default: 0
    },
    visitCount: {
        type: Number,
        default: 0
    },
    interactionCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserStats', userStatsSchema);
