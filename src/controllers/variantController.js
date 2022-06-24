const express = require("express");
const variantService = require("../services/variantService");

const router = express.Router();

router.post("/add", async (req, res) => {
  const response = await variantService.addVariant(req.body);
  res.status(200);
  res.send(response);
});

module.exports = router;
