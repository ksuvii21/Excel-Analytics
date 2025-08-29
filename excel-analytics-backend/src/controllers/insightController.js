// src/controllers/insightController.js
const xlsx = require('xlsx');
const File = require('../models/File');
const AIInsight = require('../models/AIInsight');

// Replace this with a real AI call if you enable it:
async function mockSummarize(rows) {
  const cols = rows.length ? Object.keys(rows[0]) : [];
  return `Detected ${rows.length} rows, ${cols.length} columns (${cols.join(', ')}). Consider checking missing values and outliers.`;
}

exports.generateInsight = async (req, res) => {
  try {
    if (process.env.AI_INSIGHTS === 'off') {
      return res.status(403).json({ message: 'AI insights disabled' });
    }

    const { fileId } = req.params;
    const file = await File.findOne({ _id: fileId, user: req.user.userId });
    if (!file) return res.status(404).json({ message: 'File not found' });

    const wb = xlsx.readFile(file.path);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(ws);

    // Call your AI here; currently using mock
    const summary = await mockSummarize(data);

    const insight = await AIInsight.create({
      user: req.user.userId,
      file: file._id,
      summary,
      model: 'mock',
      tokensUsed: 0
    });

    res.status(201).json(insight);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to generate insights' });
  }
};

exports.getInsightsForFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const insights = await AIInsight.find({ user: req.user.userId, file: fileId }).sort({ createdAt: -1 });
    res.json(insights);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to load insights' });
  }
};
