const Comment = require('../models/Comment');

// Get comments for a specific target (Post or Monument)
exports.getComments = async (req, res) => {
    try {
        const { refId } = req.params;
        const comments = await Comment.find({ refId }).populate('user', 'fullName avatar');
        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create comment
exports.createComment = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const comment = await Comment.create(req.body);
        res.status(201).json({
            success: true,
            data: comment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete comment
exports.deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
