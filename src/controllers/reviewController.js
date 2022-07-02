const express = require("express");
const reviewService = require("../services/reviewService");
const authenticateToken = require("../middlewares/authorization");

const router = express.Router();

router.post("/add", authenticateToken, async (req, res) => {
  const response = await reviewService.addReview(req.body);
  res.status(200);
  res.send(response);
});

module.exports = router;
