// src/routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadFile, getUserFiles, getFile, deleteFile } = require('../controllers/fileController');

router.post('/upload', auth, upload.single('file'), uploadFile);
router.get('/', auth, getUserFiles);
router.get('/my', auth, getUserFiles);
router.get('/:id', auth, getFile);
router.delete('/:id', auth, deleteFile);

module.exports = router;
