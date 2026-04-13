const express = require('express');
const router = express.Router();
const {
    getMonuments,
    getMonument,
    createMonument,
    updateMonument,
    deleteMonument
} = require('../controllers/monument.controller');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getMonuments)
    .post(protect, authorize('admin'), createMonument);

router.route('/:id')
    .get(getMonument)
    .put(protect, authorize('admin'), updateMonument)
    .delete(protect, authorize('admin'), deleteMonument);

module.exports = router;
