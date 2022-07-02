const { application } = require("express");
const express = require("express");

const subCategoryService = require("../services/subCategoryService");

const router = express.Router();

router.post("/add", async (req, res) => {
  const result = await subCategoryService.addSubCategory(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
