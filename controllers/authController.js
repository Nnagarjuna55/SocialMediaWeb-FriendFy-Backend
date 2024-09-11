//User: The User model from the ../models/User module, used for interacting with the user collection in MongoDB.
const User = require('../models/User')
//jwt: The jsonwebtoken library for creating and verifying JSON Web Tokens (JWTs).
const jwt = require("jsonwebtoken")
//bcrypt: A library for hashing and comparing passwords.
const bcrypt = require('bcrypt')

//Handles user registration.
const register = async (req, res) => {
    console.log('hha')
    try {
        //Checks if any field in req.body is empty. If so, it throws an error.
        const isEmpty = Object.values(req.body).some((v) => !v)
        if (isEmpty) {
            throw new Error("Fill all fields!")
        }

        //Checks if a user with the provided username already exists. If so, it throws an error
        const isExisting = await User.findOne({ username: req.body.username })
        if (isExisting) {
            throw new Error("Account is already registered")
        }

        console.log(req.body)
        //Hashes the user’s password using bcrypt.
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //Creates a new user object with the hashed password and saves it to the database.
        const user = new User({ ...req.body, password: hashedPassword })
        await user.save()
        //Creates a JWT with the user’s ID and username as payload and signs it using a secret key.
        const payload = { id: user._id, username: user.username }
        const { password, ...others } = user._doc

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        //Sends a JSON response with the JWT and user details (excluding the password).
        return res.status(201).json({ token, others })
    } 
    //Catches and returns any errors that occur during the process.

    catch (error) {
        return res.status(500).json(error.message)
    }
}

//login Function

const login = async (req, res) => {
    try {
        //Checks if any field in req.body is empty. If so, it throws an error.
        const isEmpty = Object.values(req.body).some((v) => !v)
        if (isEmpty) {
            throw new Error("Fill all fields!")
        }

        //Finds a user by their email. If no user is found, it throws an error.
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error("Wrong credentials")
        }

        //Compares the provided password with the hashed password stored in the database. If they don’t match, it throws an error.
        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if (!comparePass) {
            throw new Error("Wrong credentials")
        }

        //Creates a JWT with the user’s ID and username as payload and signs it using a secret key.
        const payload = { id: user._id, username: user.username }
        const { password, ...others } = user._doc

        const token = jwt.sign(payload, process.env.JWT_SECRET)

        //Sends a JSON response with the JWT and user details (excluding the password).
        return res.status(200).json({ token, others })
    } 
    //Catches and returns any errors that occur during the process.
    catch (error) {
        return res.status(500).json(error.message)
    }
}


module.exports = {
    register,
    login
}