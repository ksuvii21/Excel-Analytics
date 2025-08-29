// src/routes/insightRoutes.js
const express = require('express');
const { authenticate } = require('../middleware/roles');
const { generateInsight, getInsightsForFile } = require('../controllers/insightController');

const router = express.Router();
router.use(authenticate);
router.post('/:fileId', generateInsight);
router.get('/:fileId', getInsightsForFile);

module.exports = router;
