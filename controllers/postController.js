const Post = require('../models/post');

// Fetch all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll(); // Sequelize handles this
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

// Create a new post
exports.createPosts = async (req, res) => {
    const { image, description } = req.body;
    try {
        const newPost = await Post.create({ image, description });
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        let comments = post.comments || [];
        comments.push(comment);
        console.log(comments);
        await Post.update({ comments }, { where: { id } });
        res.json({ message: 'Comment added successfully', comments });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
};
