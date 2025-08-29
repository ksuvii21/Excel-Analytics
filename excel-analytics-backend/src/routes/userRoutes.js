// src/routes/userRoutes.js
const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/:email", auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

module.exports = router;
