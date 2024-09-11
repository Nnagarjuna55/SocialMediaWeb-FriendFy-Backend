const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true,
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
    },
    mediaUrl: {
        type: String,
    },
    productLink: {
        type: String,
    },
    productDetails: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
