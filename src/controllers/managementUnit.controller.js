const ManagementUnit = require('../models/ManagementUnit');

// Get all units
exports.getManagementUnits = async (req, res) => {
    try {
        const { search, page = 1, limit = 10 } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await ManagementUnit.countDocuments(query);

        const units = await ManagementUnit.find(query)
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            count: units.length,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit),
                next: page < Math.ceil(total / limit) ? parseInt(page) + 1 : null,
                prev: page > 1 ? parseInt(page) - 1 : null
            },
            data: units
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create unit
exports.createManagementUnit = async (req, res) => {
    try {
        const unit = await ManagementUnit.create(req.body);
        res.status(201).json({ success: true, data: unit });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get single unit
exports.getManagementUnit = async (req, res) => {
    try {
        const unit = await ManagementUnit.findById(req.params.id);
        if (!unit) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn vị quản lý' });
        res.status(200).json({ success: true, data: unit });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update unit
exports.updateManagementUnit = async (req, res) => {
    try {
        const unit = await ManagementUnit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: unit });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete unit
exports.deleteManagementUnit = async (req, res) => {
    try {
        await ManagementUnit.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
