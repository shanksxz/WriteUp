const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/post');
const { auth } = require('../middlewares/auth');

router.post('/post/create', auth, createPost);
router.get('/post', auth, getPosts);
router.get('/post/:id', auth, getPost);
router.put('/post/:id', auth,  updatePost);
router.delete('/post/:id', auth, deletePost);

module.exports = router;