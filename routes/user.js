// //userController: Imports various functions for handling user-related operations, including retrieving, updating, deleting users, and managing user relationships.
// const { getUser, getAll, updateUser, deleteUser, getUserFriends, followUser, unfollowUser,searchUsers } = require('../controllers/userController')
// //verifyToken: Imports middleware to verify user authentication.
// const verifyToken = require('../middlewares/auth')

// //userRouter: Initializes a new Express router instance specifically for handling routes related to users.
// const userRouter = require('express').Router()

// //GET /findAll: Retrieves a list of all users. The getAll function handles this request.
// userRouter.get('/findAll', getAll);

// //GET /find/:id: Retrieves a specific user using the id parameter. The getUser function handles this request.
// userRouter.get('/find/:id', getUser);


// //GET /find/userfriends/:id: Retrieves the friends of a specific user using the id parameter. The getUserFriends function handles this request.
// userRouter.get('/find/userfriends/:id', getUserFriends)

// //PUT /update/:id: Updates the details of a specific user using the id parameter. The verifyToken middleware is applied to authenticate the request before calling updateUser.
// userRouter.put('/update/:id', verifyToken, updateUser)

// //PUT /follow/:id: Allows the authenticated user to follow another user specified by the id parameter. The verifyToken middleware is used to ensure the request is authenticated before calling followUser.

// userRouter.put("/follow/:id", verifyToken, followUser)

// //PUT /unfollow/:id: Allows the authenticated user to unfollow another user specified by the id parameter. The verifyToken middleware is used to authenticate the request before processing by unfollowUser.
// userRouter.put('/unfollow/:id', verifyToken, unfollowUser)

// //DELETE /delete/:id: Deletes a specific user using the id parameter. The verifyToken middleware ensures that the request is authenticated before calling deleteUser
// userRouter.delete('/delete/:id', verifyToken, deleteUser)

// // GET /search: Searches for users by username. The searchUsers function handles this request.
// userRouter.get('/search', searchUsers);
// //Exports the userRouter instance so it can be used in other parts of the application, typically in the main server file where all routes are integrated.
// module.exports = userRouter


const { getUser, getAll, updateUser, deleteUser, getUserFriends, followUser, unfollowUser, searchUsers } = require('../controllers/userController');
const verifyToken = require('../middlewares/auth');
const userRouter = require('express').Router();

userRouter.get('/findAll', getAll);
userRouter.get('/find/:id', getUser);
userRouter.get('/find/userfriends/:id', getUserFriends);
userRouter.put('/update/:id', verifyToken, updateUser);
userRouter.put('/follow/:id', verifyToken, followUser);
userRouter.put('/unfollow/:id', verifyToken, unfollowUser);
userRouter.delete('/delete/:id', verifyToken, deleteUser);
userRouter.get('/search', searchUsers); // Corrected route

module.exports = userRouter;
