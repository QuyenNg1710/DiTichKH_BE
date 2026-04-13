const mongoose = require('mongoose');

const monumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên di tích là bắt buộc'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['Kiến trúc nghệ thuật', 'Lịch sử', 'Khảo cổ', 'Danh lam thắng cảnh'],
        default: 'Lịch sử'
    },
    level: {
        type: String,
        enum: ['Cấp quốc gia đặc biệt', 'Cấp quốc gia', 'Cấp tỉnh'],
        default: 'Cấp tỉnh'
    },
    address: {
        type: String,
        required: [true, 'Địa chỉ là bắt buộc'],
        trim: true
    },
    district: {
        type: String,
        enum: [
            'Nha Trang', 'Cam Ranh', 'Ninh Hòa', 
            'Vạn Ninh', 'Diên Khánh', 'Cam Lâm', 
            'Khánh Sơn', 'Khánh Vĩnh', 'Trường Sa'
        ],
        required: [true, 'Huyện/Thị xã/Thành phố là bắt buộc']
    },
    images: [{
        type: String
    }],
    video: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['Tốt', 'Đang xuống cấp', 'Đã trùng tu', 'Sập đổ/Phế tích'],
        default: 'Tốt'
    },
    managementUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ManagementUnit',
        default: null
    }
}, {
    timestamps: true
});
const { updateSystemStats } = require('../ultis/statsUpdater');

monumentSchema.post('save', async function() {
    await updateSystemStats('monumentTotal', 1);
});

monumentSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await updateSystemStats('monumentTotal', -1);
    }
});

module.exports = mongoose.model('Monument', monumentSchema);
