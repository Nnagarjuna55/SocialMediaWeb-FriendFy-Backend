const express = require('express');
const multer = require('multer');
const path = require('path');

// Updated the filename function to generate a unique filename if mediaUrl is not provided.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = file.mimetype.split('/')[0];
        cb(null, `public/${type}s`);
    },
    filename: (req, file, cb) => {
        const filename = req.body.mediaUrl || `${Date.now()}-${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

const uploadRouter = express.Router();

uploadRouter.post('/', upload.single('media'), (req, res) => {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);
    try {
        return res.status(201).json({ msg: 'Successfully uploaded', filePath: `/images/${req.file.filename}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

module.exports = uploadRouter;
