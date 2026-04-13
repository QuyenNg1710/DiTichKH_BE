const UserStats = require('../models/UserStats');
const SystemStats = require('../models/SystemStats');
const User = require('../models/User');
const Monument = require('../models/Monument');
const Post = require('../models/Post');
const ManagementUnit = require('../models/ManagementUnit');

// @desc    Get system-wide statistics
// @route   GET /api/stats/system
exports.getSystemStats = async (req, res) => {
    try {
        // Có thể lấy từ model SystemStats hoặc đếm trực tiếp để có số liệu thực tế nhất
        const userTotal = await User.countDocuments();
        const monumentTotal = await Monument.countDocuments();
        const postTotal = await Post.countDocuments();
        const unitTotal = await ManagementUnit.countDocuments();

        // Cập nhật hoặc tạo mới bản ghi SystemStats (tùy chọn)
        let stats = await SystemStats.findOne().sort({ createdAt: -1 });
        if (!stats) {
            stats = await SystemStats.create({ userTotal, monumentTotal, postTotal, unitTotal });
        } else {
            stats.userTotal = userTotal;
            stats.monumentTotal = monumentTotal;
            stats.postTotal = postTotal;
            stats.unitTotal = unitTotal;
            await stats.save();
        }

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get statistics for a specific user
// @route   GET /api/stats/user/:userId
exports.getUserStats = async (req, res) => {
    try {
        let stats = await UserStats.findOne({ user: req.params.userId });
        
        if (!stats) {
            // Nếu chưa có bản ghi, tạo mới với các giá trị đếm được
            const postCount = await Post.countDocuments({ author: req.params.userId });
            stats = await UserStats.create({
                user: req.params.userId,
                postCount,
                visitCount: 0,
                interactionCount: 0
            });
        }

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
