const express = require("express");
const variantService = require("../services/variantService");
const authenticateToken = require("../middlewares/authorization");
const router = express.Router();

router.get("/order/product/:id", async (req, res) => {
  const response = await variantService.getProductFromVariant(req.params.id);
  res.status(200);
  res.send(response);
});

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

router.post("/add", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const response = await variantService.addVariant(req.body);
  res.status(200);
  res.send(response);
});
router.put("/update", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const response = await variantService.updateVariant(req.body);
  res.status(200);
  res.send(response);
});
module.exports = router;
