const Monument = require('../models/Monument');

// Get all monuments
exports.getMonuments = async (req, res) => {
    try {
        const { district, category, level, search, page = 1, limit = 10 } = req.query;
        let query = {};
        
        // Filter
        if (district) query.district = district;
        if (category) query.category = category;
        if (level) query.level = level;

        // Search
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Monument.countDocuments(query);

        const monuments = await Monument.find(query)
            .populate('managementUnit', 'name address phone')
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: monuments.length,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                next: page < Math.ceil(total / limit) ? parseInt(page) + 1 : null,
                prev: page > 1 ? parseInt(page) - 1 : null
            },
            data: monuments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single monument
exports.getMonument = async (req, res) => {
    try {
        const monument = await Monument.findById(req.params.id).populate('managementUnit');
        if (!monument) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy di tích'
            });
        }
        res.status(200).json({
            success: true,
            data: monument
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create new monument
exports.createMonument = async (req, res) => {
    try {
        const monument = await Monument.create(req.body);
        res.status(201).json({
            success: true,
            data: monument
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update monument
exports.updateMonument = async (req, res) => {
    try {
        const monument = await Monument.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!monument) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy di tích'
            });
        }
        res.status(200).json({
            success: true,
            data: monument
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete monument
exports.deleteMonument = async (req, res) => {
    try {
        const monument = await Monument.findByIdAndDelete(req.params.id);
        if (!monument) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy di tích'
            });
        }
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
