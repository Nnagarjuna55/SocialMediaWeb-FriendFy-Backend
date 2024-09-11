// //Imports the mongoose library, which is used to define schemas and interact with MongoDB.
// const mongoose = require('mongoose');

// //Creates a new schema for the User collection using mongoose.Schema. This schema outlines the structure and constraints of the user documents in the MongoDB database.
// const UserSchema = new mongoose.Schema({
//     //username: A string field that is required. It must be between 3 and 20 characters long. The unique: true constraint ensures that each username is unique across the collection.
//     username: {
//         type: String,
//         required: true,
//         min: 3,
//         max: 20,
//         unique: true,
//     },
//     //email: A string field that is required. It can be up to 50 characters long. The unique: true constraint ensures that each email address is unique.
//     email: {
//         type: String,
//         required: true,
//         max: 50,
//         unique: true,
//     },
//     //password: A string field that is required. It must be at least 6 characters long. This field stores the hashed password.
//     password: {
//         type: String,
//         required: true,
//         min: 6,
//     },
//     //profilePicture: A string field that stores the URL of the user's profile picture. It defaults to an empty string if no profile picture is provided.
//     profilePicture: {
//         type: String,
//         default: '',
//     },
//     //coverPicture: A string field that stores the URL of the user's cover picture. It defaults to an empty string if no cover picture is provided.
//     coverPicture: {
//         type: String,
//         default: '',
//     },
//     //followers: An array field that stores the IDs of users who follow this user. It defaults to an empty array.
//     followers: {
//         type: Array,
//         default: [],
//     },
//     //followings: An array field that stores the IDs of users whom this user follows. It defaults to an empty array.
//     followings: {
//         type: Array,
//         default: [],
//     },

//     //isAdmin: A boolean field indicating if the user has admin privileges. It defaults to false.
//     isAdmin: {
//         type: Boolean,
//         default: false,
//     },
//     //desc: A string field that can store a short description about the user, up to 50 characters.
//     desc: {
//         type: String,
//         max: 50,
//     },
//     //city: A string field that can store the city where the user lives, up to 50 characters.
//     city: {
//         type: String,
//         max: 50,
//     },
//     //from: A string field that can store the place the user is originally from, up to 50 characters.
//     from: {
//         type: String,
//         max: 50,
//     },
//     //relationship: A number field that indicates the user's relationship status. It must be one of the values specified in the enum array (1, 2, or 3).
//     relationship: {
//         type: Number,
//         enum: [1, 2, 3],
//     },

//     //{ timestamps: true }: Adds createdAt and updatedAt fields to the schema, which are automatically managed by Mongoose to track when the document was created and last updated.
// }, { timestamps: true });

// //Exports the User model created from UserSchema. This model allows you to perform CRUD operations on the users collection in the MongoDB database.
// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   username: {
    type: String,
    required: true,
    unique: true,
   },
   email: {
    type: String,
    required: true,
    unique: true,
   },
   password: {
    type: String,
    required: true,
   },
   profilePic: {
    type: String,
    default: ''
   },
   coverPic: {
    type: String,
    default: ''
   },
   followers: {
    type: Array,
    default: []
   },
   followings: {
    type: Array,
    default: []
   },
   posts: {
    type: Array,
    default: []
   }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)