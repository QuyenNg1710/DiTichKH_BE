const express = require('express');
const router = express.Router();
const {
    getComments,
    createComment,
    deleteComment
} = require('../controllers/comment.controller');
const { protect } = require('../middleware/auth');

router.post('/', protect, createComment);
router.get('/:refId', getComments); // Bình luận công khai nên GET không cần protect
router.delete('/:id', protect, deleteComment);

module.exports = router;
