// src/models/AIInsight.js
const mongoose = require('mongoose');

const aiInsightSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    file: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
    summary: { type: String, required: true },
    model: { type: String, default: 'mock' }, // e.g., "gpt-4o-mini"
    tokensUsed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AIInsight', aiInsightSchema);
