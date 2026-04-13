const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Tên đăng nhập là bắt buộc'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu là bắt buộc'],
        minlength: 6,
        select: false
    },
    email: {
        type: String,
        required: [true, 'Email là bắt buộc'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Vui lòng cung cấp email hợp lệ'
        ]
    },
    fullName: {
        type: String,
        required: [true, 'Họ tên là bắt buộc'],
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    birthday: {
        type: Date
    },
    avatar: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        enum: ['Nam', 'Nữ'],
        default: 'Nữ'
    },
    token: {
        type: String,
        select: false
    },
    refreshToken: {
        type: String,
        select: false
    }
}, {
    timestamps: true
});
const { updateSystemStats } = require('../ultis/statsUpdater');

userSchema.post('save', async function() {
    await updateSystemStats('userTotal', 1);
});

userSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await updateSystemStats('userTotal', -1);
    }
});

module.exports = mongoose.model('User', userSchema);
