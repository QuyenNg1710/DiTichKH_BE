const Post = require('../models/Post');

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        let query = {};

        // Search
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Post.countDocuments(query);

        const posts = await Post.find(query)
            .populate('author', 'fullName avatar')
            .populate('monument', 'name')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                next: page < Math.ceil(total / limit) ? parseInt(page) + 1 : null,
                prev: page > 1 ? parseInt(page) - 1 : null
            },
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create post
exports.createPost = async (req, res) => {
    try {
        req.body.author = req.user.id;
        const post = await Post.create(req.body);
        res.status(201).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get single post
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'fullName avatar');
        if (!post) {
            return res.status(404).json({ success: false, message: 'Bài viết không tồn tại' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete post
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
