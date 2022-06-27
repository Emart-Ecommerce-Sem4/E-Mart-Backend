const express = require("express");
const reviewService = require("../services/reviewService");

const router = express.Router();

router.post("/add", async (req, res) => {
  const response = await reviewService.addReview(req.body);
  res.status(200);
  res.send(response);
});

module.exports = router;
