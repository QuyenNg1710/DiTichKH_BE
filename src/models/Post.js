const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Tiêu đề bài viết là bắt buộc'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Nội dung bài viết là bắt buộc']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    monument: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Monument',
        default: null
    },
    images: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['pending', 'published', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});
const { updateSystemStats, updateUserStats } = require('../ultis/statsUpdater');

postSchema.post('save', async function() {
    await updateSystemStats('postTotal', 1);
    await updateUserStats(this.author, 'postCount', 1);
});

postSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await updateSystemStats('postTotal', -1);
        await updateUserStats(doc.author, 'postCount', -1);
    }
});

module.exports = mongoose.model('Post', postSchema);
