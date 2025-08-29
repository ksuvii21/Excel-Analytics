// src/middleware/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dest = 'uploads';
if (!fs.existsSync(dest)) fs.mkdirSync(dest);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dest),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.xlsx' && ext !== '.xls') return cb(new Error('Only Excel files are allowed'), false);
  cb(null, true);
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
