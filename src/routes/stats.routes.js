const express = require('express');
const router = express.Router();
const { getSystemStats, getUserStats } = require('../controllers/stats.controller');
const { protect, authorize } = require('../middleware/auth');

// Chỉ admin mới xem được tổng quát hệ thống hoặc bất kỳ ai? 
// Thường dashboard admin mới cần system stats.
router.get('/system', protect, authorize('admin'), getSystemStats);

// Xem chỉ số cá nhân
router.get('/user/:userId', protect, getUserStats);

module.exports = router;
