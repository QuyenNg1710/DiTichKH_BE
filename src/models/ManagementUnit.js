const mongoose = require('mongoose');

const managementUnitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên đơn vị quản lý là bắt buộc'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Địa chỉ đơn vị là bắt buộc'],
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});
const { updateSystemStats } = require('../ultis/statsUpdater');

managementUnitSchema.post('save', async function() {
    await updateSystemStats('unitTotal', 1);
});

managementUnitSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await updateSystemStats('unitTotal', -1);
    }
});

module.exports = mongoose.model('ManagementUnit', managementUnitSchema);
