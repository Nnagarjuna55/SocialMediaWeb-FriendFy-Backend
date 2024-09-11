//
const Comment = require("../models/Comment");

//Retrieve all comments associated with a specific post.

const getCommentsFromPost = async (req, res) => {
  try {
    //Uses Comment.find to get all comments where the postId matches the postId parameter from the request.
    const comments = await Comment.find({ postId: req.params.postId })

    //Sends a JSON response with the fetched comments and a 200 OK status.
    return res.status(200).json(comments)
  }
  //Catches any errors that occur during the operation and sends a 500 Internal Server Error response with the error message.

  catch (error) {
    return res.status(500).json(error.message)
  }
}

//Create a new comment and associate it with the current user.

const createComment = async (req, res) => {
  try {

    // Uses Comment.create to add a new comment to the database. The comment data is taken from req.body, and the userId is set to the ID of the currently authenticated user (req.user.id).
    const createdComment = await Comment.create({ ...req.body, userId: req.user.id })
    // Sends a JSON response with the created comment and a 201 Created status.
    return res.status(201).json(createdComment)
  }
  //Catches any errors that occur during the operation and sends a 500 Internal Server Error response with the error message.
  catch (error) {
    return res.status(500).json(error.message)
  }
}

//Delete a comment if the current user is the owner.
const deleteComment = async (req, res) => {
  try {

    //Finds the comment by its ID, which is provided in the request parameters.
    const comment = await Comment.findById(req.params.commentId)
    // Checks if the userId of the comment matches the ID of the currently authenticated user. If it matches, deletes the comment and sends a 200 OK response. If not, sends a 403 Forbidden response indicating that the user can only delete their own comments.
    if (comment.userId === req.user.id) {
      await Comment.findByIdAndDelete(req.params.commentId)
      return res.status(200).json({ msg: "Comment has been successfully deleted" })
    } else {
      return res.status(403).json({ msg: "You can delete only your own comments" })
    }
  } 
  //Catches any errors that occur during the operation and sends a 500 Internal Server Error response with the error message.
  catch (error) {
    return res.status(500).json(error.message)
  }
}

//Toggle the like status of a comment for the current user.
const toggleLike = async (req, res) => {
  try {
    const currentUserId = req.user.id
    //Finds the comment by its ID, which is provided in the request parameters.
    const comment = await Comment.findById(req.params.commentId)

    // Checks if the likes array of the comment contains the ID of the current user. 
    //If not, adds the user ID to the likes array and saves the comment. If the user ID is already in the array, removes it and saves the comment. Sends a 200 OK response indicating the action taken (liked or unliked).
    if (!comment.likes.includes(currentUserId)) {
      comment.likes.push(currentUserId)
      await comment.save()
      return res.status(200).json({ msg: "Comment has been successfully liked!" })
    } else {
      comment.likes = comment.likes.filter((id) => id !== currentUserId)
      await comment.save()
      return res.status(200).json({ msg: "Comment has been successfully unliiked" })
    }
  } 
  //Catches any errors that occur during the operation and sends a 500 Internal Server Error response with the error message.
  catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = {
  getCommentsFromPost,
  createComment,
  deleteComment,
  toggleLike
}