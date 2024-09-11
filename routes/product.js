const express = require('express');
const { 
    getProductPost, 
    getUserProductPosts, 
    createProductPost, 
    updateProductPost, 
    deleteProductPost, 
    getTimelineProductPosts, 
    likeProductPost, 
    dislikeProductPost, 
    getAllProductPosts 
} = require('../controllers/productController');
const verifyToken = require('../middlewares/auth');

const productPostRouter = express.Router();

productPostRouter.get("/find/:id", getProductPost);
productPostRouter.get("/find/userposts/:id", getUserProductPosts);
productPostRouter.get('/timelineProductPosts', verifyToken, getTimelineProductPosts);
productPostRouter.post("/", verifyToken, createProductPost);
productPostRouter.put("/updateProductPost/:id", verifyToken, updateProductPost);
productPostRouter.delete('/deleteProductPost/:id', verifyToken, deleteProductPost);
productPostRouter.put("/likeProductPost/:id", verifyToken, likeProductPost);
productPostRouter.put("/dislikeProductPost/:id", verifyToken, dislikeProductPost);
productPostRouter.get('/all', getAllProductPosts);

module.exports = productPostRouter;
