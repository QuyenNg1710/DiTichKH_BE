const SystemStats = require('../models/SystemStats');
const UserStats = require('../models/UserStats');

const updateSystemStats = async (field, increment) => {
    try {
        let stats = await SystemStats.findOne();
        if (!stats) {
            stats = await SystemStats.create({});
        }
        stats[field] = (stats[field] || 0) + increment;
        await stats.save();
    } catch (error) {
        console.error('Error updating system stats:', error);
    }
};

const updateUserStats = async (userId, field, increment) => {
    try {
        let stats = await UserStats.findOne({ user: userId });
        if (!stats) {
            stats = await UserStats.create({ user: userId });
        }
        stats[field] = (stats[field] || 0) + increment;
        await stats.save();
    } catch (error) {
        console.error('Error updating user stats:', error);
    }
};

module.exports = { updateSystemStats, updateUserStats };
