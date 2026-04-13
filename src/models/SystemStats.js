const mongoose = require('mongoose');

const systemStatsSchema = new mongoose.Schema({
    userTotal: {
        type: Number,
        default: 0
    },
    monumentTotal: {
        type: Number,
        default: 0
    },
    postTotal: {
        type: Number,
        default: 0
    },
    unitTotal: {
        type: Number,
        default: 0
    },
    visitTotal: {
        type: Number,
        default: 0 // Tổng lượt truy cập toàn website
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SystemStats', systemStatsSchema);
