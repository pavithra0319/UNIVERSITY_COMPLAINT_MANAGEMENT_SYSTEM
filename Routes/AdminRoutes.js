const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
