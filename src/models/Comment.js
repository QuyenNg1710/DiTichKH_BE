const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Nội dung bình luận là bắt buộc'],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Bình luận có thể dành cho Bài viết hoặc Di tích
    refId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Monument']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
