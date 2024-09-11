
// const mongoose = require("mongoose");

// const PostSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true,
//     },
//     desc: {
//         type: String,
//         required: true,
//         min: 10,
//         max: 100,
//     },
//     imageUrl: {
//         type: String,
//     },
//     videoUrl: {
//         type: String,
//     },
//     mediaType: {
//         type: String,
//         enum: ['image', 'video'],
//     },
//     likes: {
//         type: Array,
//         default: []
//     }
// }, { timestamps: true });

// module.exports = mongoose.model("Post", PostSchema);




const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        min: 10,
        max: 500,
    }
}, { timestamps: true });

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
        min: 10,
        max: 100,
    },
    imageUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
    },
    likes: {
        type: Array,
        default: []
    },
    reviews: [ReviewSchema], // New field for storing reviews
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
