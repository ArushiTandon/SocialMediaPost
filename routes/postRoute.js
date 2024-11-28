const express = require('express');
const { getPosts, createPosts, addComment } = require('../controllers/postController');
const router = express.Router();

// Get all posts
router.get('/posts', getPosts);

// Create a new post
router.post('/posts', createPosts);

// Add a comment to a post
router.post('/posts/comments/:id', addComment);

module.exports = router;
