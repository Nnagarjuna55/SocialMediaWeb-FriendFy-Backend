//Imports the mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a schema-based solution to model your application data.
const mongoose = require('mongoose')

//Creates a new schema using mongoose.Schema. A schema defines the structure of documents within a collection in MongoDB.
const CommentSchema = new mongoose.Schema({
    //text: A string field that is required. This will store the content of the comment.
    text: {
        type: String,
        required: true
    },
    //postId: A string field that is required. This links the comment to a specific post by storing the post’s ID.
    postId: {
        type: String,
        required: true
    },
    //userId: A string field that is required. This represents the ID of the user who made the comment.
    userId: {
        type: String,
        required: true
    },
    //likes: An array that stores the IDs of users who liked the comment. It defaults to an empty array if no likes are initially present.
    likes: {
        type: Array,
        default: []
    }
    //{ timestamps: true }: Adds createdAt and updatedAt fields to the schema. These fields automatically track when a document is created and last updated.
}, {timestamps: true})

//Exports the model named Comment created from CommentSchema. This model can be used to interact with the comments collection in the MongoDB database.
module.exports = mongoose.model('Comment', CommentSchema)