const Favorite = require('../models/Favorite');

// @desc    Toggle favorite (Add/Remove)
// @route   POST /api/favorites/toggle
exports.toggleFavorite = async (req, res) => {
    try {
        const { monumentId } = req.body;
        const userId = req.user.id; 

        const existing = await Favorite.findOne({ user: userId, monument: monumentId });

        if (existing) {
            await Favorite.findByIdAndDelete(existing._id);
            return res.status(200).json({
                success: true,
                message: 'Đã xóa khỏi danh sách yêu thích',
                isFavorite: false
            });
        }

        const favorite = await Favorite.create({ user: userId, monument: monumentId });
        res.status(201).json({
            success: true,
            data: favorite,
            isFavorite: true
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user favorites
// @route   GET /api/favorites/:userId
exports.getUserFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.params.userId }).populate('monument');
        res.status(200).json({
            success: true,
            count: favorites.length,
            data: favorites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
