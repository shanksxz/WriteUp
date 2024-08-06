const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes : {
        type : Number,
        default : 0
    },
});

module.exports = mongoose.model('Comment', commentSchema);