const express = require("express");
const categoryService = require("../services/categoryService");

const router = express.Router();

router.post("/add", async (req, res) => {
  const result = await categoryService.addCategory(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
