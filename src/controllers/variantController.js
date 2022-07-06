const express = require("express");
const variantService = require("../services/variantService");
const authenticateToken = require("../middlewares/authorization");
const router = express.Router();

router.get("/product/:id", async (req, res) => {
  const response = await variantService.getVarientsForProductId(req.params.id);
  res.status(200);
  res.send(response);
});

router.get("/:id", async (req, res) => {
  const response = await variantService.getVariant(req.params.id);
  res.status(200);
  res.send(response);
});

router.post("/add", async (req, res) => {
  const response = await variantService.addVariant(req.body);
  res.status(200);
  res.send(response);
});
router.put("/update/:ID", authenticateToken, async (req, res) => {
  const data = { id: req.params.ID, ...req.body };
  const response = await variantService.updateVariant(data);
  res.status(200);
  res.send(response);
});
module.exports = router;
