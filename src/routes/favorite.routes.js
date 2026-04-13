const express = require('express');
const router = express.Router();
const { toggleFavorite, getUserFavorites } = require('../controllers/favorite.controller');
const { protect } = require('../middleware/auth');

router.post('/toggle', protect, toggleFavorite);
router.get('/user/:userId', protect, getUserFavorites);

module.exports = router;
