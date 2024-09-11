//Imports the functions getCommentsFromPost, deleteComment, toggleLike, and createComment from the commentController module. These functions handle the logic for retrieving, deleting, liking/unliking, and creating comments, respectively.
//Imports the verifyToken middleware function, which will be used to authenticate requests.
const { getCommentsFromPost, deleteComment, toggleLike, createComment } = require('../controllers/commentController')
const verifyToken = require('../middlewares/auth')

//Creates an Express router instance using express.Router(). This router will manage routes related to comments.
const commentRouter = require('express').Router()

//GET /:postId: Retrieves all comments for a specific post. The postId parameter is used to find the comments related to that post. The getCommentsFromPost function handles the request.
commentRouter.get('/:postId', getCommentsFromPost)

//POST /: Creates a new comment. The verifyToken middleware is applied to ensure that the request is authenticated before the createComment function processes it.
commentRouter.post('/', verifyToken, createComment)

// DELETE /:commentId: Deletes a comment specified by commentId. The verifyToken middleware ensures that only authenticated users can delete comments, and the deleteComment function handles the deletion logic.
commentRouter.delete('/:commentId', verifyToken, deleteComment)

//PUT /toggleLike/:commentId: Toggles the like status for a comment specified by commentId. The verifyToken middleware ensures that only authenticated users can like or unlike comments, and the toggleLike function handles this operation.
commentRouter.put('/toggleLike/:commentId', verifyToken, toggleLike)

//Exports the commentRouter instance so it can be used in other parts of the application, typically in the main server file where all routes are integrated.
module.exports = commentRouter