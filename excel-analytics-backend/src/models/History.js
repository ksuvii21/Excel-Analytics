const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  userId: String,
  fileName: String,
  chartType: String,
  xAxis: String,
  yAxis: String,
  zAxis: String,
  date: Date
});

module.exports = mongoose.model("History", HistorySchema);
