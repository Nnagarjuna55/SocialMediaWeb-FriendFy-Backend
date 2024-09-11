//Imports the register and login functions from the authController module. These functions will handle the logic for user registration and login.

const { register, login } = require("../controllers/authController")

//Creates an Express router instance using express.Router(). This router will be used to define authentication-related routes.
const authRouter = require("express").Router()

//register: Defines a POST route for user registration. When a POST request is made to /register, the register function from authController will be invoked to handle the request.
//login: Defines a POST route for user login. When a POST request is made to /login, the login function from authController will be invoked to handle the request.

authRouter.post('/register', register)
authRouter.post('/login', login)

//Exports the authRouter instance so it can be used in other parts of the application, typically in the main server file where all routes are assembled.
module.exports = authRouter