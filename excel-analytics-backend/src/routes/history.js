const express = require("express");
const router = express.Router();
const History = require("../models/History"); // adjust path to your schema

// Save analysis
router.post("/", async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const newHistory = new History({ title, content, userId });
    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (err) {
    res.status(500).json({ message: "Failed to save analysis" });
  }
});

// Load history by userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await History.find({ userId });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to load history" });
  }
});

// AI Summary endpoint (dummy, replace with AI API call)
router.post("/summary", async (req, res) => {
  try {
    const { content } = req.body;
    // call AI API here (e.g., OpenAI)
    const summary = `Summary of content length ${content.length}`;
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate summary" });
  }
});

module.exports = router;


