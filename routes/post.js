//postController: Imports various functions for handling posts, including retrieving, creating, updating, deleting, and liking/unliking posts.

const { getPost, getUserPosts, createPost, updatePost, deletePost, getTimelinePosts, likePost, dislikePost, getAllPosts,  createReview, getReviews, getAverageRating } = require('../controllers/postController')

//verifyToken: Imports middleware to verify user authentication.
const verifyToken = require('../middlewares/auth')
//express: Imports the Express module.
const express = require('express');

//postRouter: Initializes a new Express router instance specifically for handling routes related to posts.
//userRouter: Initializes another Express router instance, though it’s not used in this code snippet.
const postRouter = require('express').Router()
const userRouter = express.Router();

//GET /find/:id: Fetches a specific post using the id parameter. The getPost function handles this request.
postRouter.get("/find/:id", getPost)
//GET /find/userposts/:id: Retrieves all posts from a specific user using the id parameter. The getUserPosts function handles this request.
postRouter.get("/find/userposts/:id", getUserPosts)
//GET /timelinePosts: Fetches posts for the authenticated user’s timeline. The verifyToken middleware ensures that the request is authenticated before processing by getTimelinePosts.
postRouter.get('/timelinePosts', verifyToken, getTimelinePosts)
//POST /: Creates a new post. The verifyToken middleware is applied to authenticate the request before calling createPost.
postRouter.post("/", verifyToken, createPost)

// PUT /updatePost/:postId: Updates an existing post specified by postId. The verifyToken middleware ensures that the request is authenticated before processing by updatePost.
postRouter.put("/updatePost/:postId", verifyToken, updatePost);

//DELETE /deletePost/:postId: Deletes a specific post using the postId parameter. The verifyToken middleware ensures that the request is authenticated before calling deletePost.
postRouter.delete('/deletePost/:postId', verifyToken, deletePost);


//PUT /likePost/:postId: Likes a post specified by postId. The verifyToken middleware is applied to authenticate the request before processing by likePost.
postRouter.put("/likePost/:postId", verifyToken, likePost)

//PUT /dislikePost/:postId: Dislikes a post specified by postId. The verifyToken middleware ensures that the request is authenticated before calling dislikePost.
postRouter.put("/dislikePost/:postId", verifyToken, dislikePost)

// Define the route for retrieving all posts
postRouter.get('/all', getAllPosts); 

postRouter.post('/:postId/review', verifyToken, createReview);
postRouter.get('/:postId/reviews', getReviews);
postRouter.get('/:postId/average-rating', getAverageRating);

//Exports the postRouter instance so it can be used in other parts of the application, typically in the main server file where all routes are integrated.
module.exports = postRouter

