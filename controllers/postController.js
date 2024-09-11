const User = require("../models/User");
const Post = require("../models/Post");

//Retrieve a specific post by its ID.
const getPost = async (req, res) => {
    try {
        //Finds the post using its ID, which is provided in the request parameters.
        const post = await Post.findById(req.params.postId);

        //Sends a JSON response with the post data and a 200 OK status.
        return res.status(200).json(post);
    }
    //Catches any errors and sends a 500 Internal Server Error response with the error message.
    catch (error) {
        return res.status(500).json(error.message);
    }
};

//Retrieve all posts created by a specific user.
const getUserPosts = async (req, res) => {
    try {
        // Finds the user by their ID.
        const user = await User.findById(req.params.id);
        //If the user does not exist, sends a 404 Not Found response.
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        //Finds all posts created by the user.
        const posts = await Post.find({ userId: req.params.id });
        //Sends a JSON response with the user's posts and a 200 OK status.
        return res.status(200).json(posts);
    }
    //Catches any errors and sends a 500 Internal Server Error response.
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const createPost = async (req, res) => {
    try {
        const { desc, mediaUrl, mediaType } = req.body;

        if (!desc) {
            return res.status(400).json({ error: "Description is required!" });
        }

        if (mediaType && !mediaUrl) {
            return res.status(400).json({ error: "Media URL is required for the selected media type!" });
        }

        const post = await Post.create({
            desc,
            userId: req.user.id,
            mediaType,
            [mediaType === 'image' ? 'imageUrl' : 'videoUrl']: mediaUrl
        });

        return res.status(201).json(post);
    } catch (error) {
        console.error('Post creation error:', error);
        return res.status(500).json({ error: error.message });
    }
};



// In controllers/postController.js
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { desc } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only edit your own posts' });
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, { desc }, { new: true });
        return res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};



// In controllers/postController.js
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
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


// Like a specific post if it has not already been liked by the current user.
const likePost = async (req, res) => {
    try {
        //Finds the post by its ID.
        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error("No such post");
        }

        //Checks if the current user has already liked the post. If not, adds the user ID to the likes array and updates the post.
        const isLikedByCurrentUser = post.likes.includes(req.user.id);
        if (isLikedByCurrentUser) {
            throw new Error("Can't like a post two times");
        } else {
            await Post.findByIdAndUpdate(
                req.params.postId,
                { $push: { likes: req.user.id } },
                { new: true }
            );
            return res.status(200).json({ msg: "Post has been successfully liked" });
        }
    }
    //Catches any errors and sends a 500 Internal Server Error response with the error message.
    catch (error) {
        return res.status(500).json(error.message);
    }
};

//Dislike a specific post if it has been liked by the current user.
const dislikePost = async (req, res) => {
    try {
        //Finds the post by its ID.
        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error("No such post");
        }

        // Checks if the current user has liked the post. If yes, removes the user ID from the likes array and updates the post. If not, throws an error.
        const isLikedByCurrentUser = post.likes.includes(req.user.id);
        if (isLikedByCurrentUser) {
            await Post.findByIdAndUpdate(
                req.params.postId,
                { $pull: { likes: req.user.id } },
                { new: true }
            );
            return res.status(200).json({ msg: "Post has been successfully disliked" });
        } else {
            throw new Error("Can't dislike that you haven't liked");
        }
    }
    //Catches any errors and sends a 500 Internal Server Error response with the error message
    catch (error) {
        return res.status(500).json(error.message);
    }
};

//Retrieve posts from the current user and their friends for the timeline.
const getTimelinePosts = async (req, res) => {
    try {
        //Finds the current user by their ID.
        const currentUser = await User.findById(req.user.id);
        //Fetches all posts created by the current user.
        const userPosts = await Post.find({ userId: currentUser._id });
        //Fetches posts from the current user’s friends using Promise.all to handle multiple asynchronous requests.
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        //Combines user posts and friend posts, sorts them by creation date in descending order, and sends the result as a JSON response.
        return res.json(userPosts.concat(...friendPosts).sort((a, b) => b.createdAt - a.createdAt));
    }
    //Catches any errors and sends a 500 Internal Server Error response.
    catch (err) {
        res.status(500).json(err);
    }
};

// In controllers/postController.js
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find(); // Assuming you are using MongoDB
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }
};

// Create a review for a post
const createReview = async (req, res) => {
    try {
        const { postId } = req.params;
        const { rating, comment } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newReview = {
            userId: req.user.id,
            rating,
            comment,
        };

        post.reviews.push(newReview);
        await post.save();

        return res.status(201).json(post);
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all reviews for a post
const getReviews = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId).populate('reviews.userId', 'username');
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(post.reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get average rating for a post
const getAverageRating = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const totalRating = post.reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = post.reviews.length ? (totalRating / post.reviews.length) : 0;

        return res.status(200).json({ averageRating });
    } catch (error) {
        console.error('Error calculating average rating:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getPost,
    getUserPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
    getTimelinePosts,
    getAllPosts,
    createReview,
    getReviews,
    getAverageRating
};

