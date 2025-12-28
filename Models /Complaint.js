const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    name: String,
    department: String,
    complaint: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
