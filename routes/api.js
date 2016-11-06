const express = require('express');
const router = express.Router();
const path = require('path');
const mime = require('mime');
const crypto = require('crypto');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './build/images/')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);

        ext = ext.length > 1 ? ext : `.${mime.extension(file.mimetype)}`;

        crypto.pseudoRandomBytes(16, (err, raw) => {
            cb(null, (err ? undefined : raw.toString('hex') ) + ext);
        });
    }
});

const upload = multer({ storage });

router.post('/images', upload.single('image'), (req, res) => {
    res.end(JSON.stringify({
        message: 'File uploaded successfully',
        imageUrl: `images/${req.file.filename}`
    }));
});

module.exports = router;
