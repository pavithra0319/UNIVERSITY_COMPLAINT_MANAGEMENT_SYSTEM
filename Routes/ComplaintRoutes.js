const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

/* Submit complaint */
router.post("/", async (req, res) => {
  const { name, department, complaint } = req.body;
  await Complaint.create({ name, department, complaint });
  res.json({ message: "Complaint submitted" });
});

/* Get complaints */
router.get("/", async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

/* Delete complaint */
router.delete("/:id", async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ message: "Complaint deleted" });
});

module.exports = router;
