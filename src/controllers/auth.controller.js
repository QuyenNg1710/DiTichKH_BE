const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Token Generator
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Register user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { username, password, role, fullName } = req.body;
        
        // Simple check (In practice password should be hashed - e.g. bcrypt)
        const user = await User.create({
            username,
            password, // NOTE: Plan to add bcrypt hashing here
            role,
            fullName
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp username và password'
            });
        }

        const user = await User.findOne({ username }).select('+password');

        if (!user || user.password !== password) { // Simple check for now
            return res.status(401).json({
                success: false,
                message: 'Thông tin đăng nhập không chính xác'
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
