// src/controllers/adminController.js
const User = require('../models/User');
const File = require('../models/File');
const AIInsight = require('../models/AIInsight');

exports.listUsersWithUsage = async (_req, res) => {
  try {
    const aggregation = await File.aggregate([
      { $group: { _id: '$user', files: { $sum: 1 }, bytes: { $sum: '$size' } } }
    ]);

    const insightsAgg = await AIInsight.aggregate([
      { $group: { _id: '$user', insights: { $sum: 1 } } }
    ]);

    const usageMap = new Map(aggregation.map(a => [String(a._id), a]));
    const insightsMap = new Map(insightsAgg.map(a => [String(a._id), a.insights]));

    const users = await User.find({}, 'name email role createdAt').lean();
    const result = users.map(u => {
      const uId = String(u._id);
      const uUsage = usageMap.get(uId) || { files: 0, bytes: 0 };
      const insights = insightsMap.get(uId) || 0;
      return {
        ...u,
        usage: { files: uUsage.files || 0, bytes: uUsage.bytes || 0, insights }
      };
    });

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to load users' });
  }
};

exports.setUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // 'user' | 'admin'
    if (!['user', 'admin', 'superadmin'].includes(role))
      return res.status(400).json({ message: 'Invalid role' });

    const updated = await User.findByIdAndUpdate(id, { role }, { new: true, fields: 'name email role' });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to update role' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Promise.all([
      User.findByIdAndDelete(id),
      File.deleteMany({ user: id }),
      AIInsight.deleteMany({ user: id }),
    ]);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
