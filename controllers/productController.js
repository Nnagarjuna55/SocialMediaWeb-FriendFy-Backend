const Product = require('../models/Product');
const User = require('../models/User');

// Retrieve a specific product post by its ID.
const getProductPost = async (req, res) => {
    try {
        const post = await Product.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Product post not found" });
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Retrieve all product posts created by a specific user.
const getUserProductPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const posts = await Product.find({ userId: req.params.id });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Create a new product post.
const createProductPost = async (req, res) => {
    try {
        const { desc, mediaUrl, mediaType, productLink, productDetails } = req.body;

        if (!desc) {
            return res.status(400).json({ error: "Description is required!" });
        }

        if (mediaType && !mediaUrl) {
            return res.status(400).json({ error: "Media URL is required for the selected media type!" });
        }

        const post = await Product.create({
            desc,
            userId: req.user.id,
            mediaType,
            mediaUrl,
            productLink,
            productDetails
        });

        return res.status(201).json(post);
    } catch (error) {
        console.error('Post creation error:', error);
        return res.status(500).json({ error: error.message });
    }
};

// Update a product post.
const updateProductPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { desc } = req.body;

        const post = await Product.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only edit your own posts' });
        }

        const updatedPost = await Product.findByIdAndUpdate(id, { desc }, { new: true });
        return res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product post.
const deleteProductPost = async (req, res) => {
    try {
        const post = await Product.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.userId.toString() === req.user.id) {
            await post.deleteOne();
            return res.status(200).json({ message: "Post has been deleted" });
        } else {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error: " + err.message });
    }
};

// Like a specific product post.
const likeProductPost = async (req, res) => {
    try {
        const post = await Product.findById(req.params.id);
        if (!post) {
            throw new Error("No such post");
        }

        const isLikedByCurrentUser = post.likes.includes(req.user.id);
        if (isLikedByCurrentUser) {
            throw new Error("Can't like a post two times");
        } else {
            await Product.findByIdAndUpdate(
                req.params.id,
                { $push: { likes: req.user.id } },
                { new: true }
            );
            return res.status(200).json({ msg: "Post has been successfully liked" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Dislike a specific product post.
const dislikeProductPost = async (req, res) => {
    try {
        const post = await Product.findById(req.params.id);
        if (!post) {
            throw new Error("No such post");
        }

        const isLikedByCurrentUser = post.likes.includes(req.user.id);
        if (isLikedByCurrentUser) {
            await Product.findByIdAndUpdate(
                req.params.id,
                { $pull: { likes: req.user.id } },
                { new: true }
            );
            return res.status(200).json({ msg: "Post has been successfully disliked" });
        } else {
            throw new Error("Can't dislike that you haven't liked");
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Retrieve posts from the current user and their friends for the timeline.
const getTimelineProductPosts = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const userPosts = await Product.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Product.find({ userId: friendId });
            })
        );
        return res.json(userPosts.concat(...friendPosts).sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Retrieve all product posts.
const getAllProductPosts = async (req, res) => {
    try {
        const posts = await Product.find().sort({ createdAt: -1 });
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProductPost,
    getUserProductPosts,
    createProductPost,
    updateProductPost,
    deleteProductPost,
    getTimelineProductPosts,
    likeProductPost,
    dislikeProductPost,
    getAllProductPosts
};
