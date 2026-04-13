const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    monument: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Monument',
        required: true
    }
}, {
    timestamps: true
});

// Đảm bảo một user chỉ favorite một di tích một lần
favoriteSchema.index({ user: 1, monument: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
