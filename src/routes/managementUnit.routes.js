const express = require('express');
const router = express.Router();
const {
    getManagementUnits,
    getManagementUnit,
    createManagementUnit,
    updateManagementUnit,
    deleteManagementUnit
} = require('../controllers/managementUnit.controller');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getManagementUnits)
    .post(protect, authorize('admin'), createManagementUnit);

router.route('/:id')
    .get(getManagementUnit)
    .put(protect, authorize('admin'), updateManagementUnit)
    .delete(protect, authorize('admin'), deleteManagementUnit);

module.exports = router;
