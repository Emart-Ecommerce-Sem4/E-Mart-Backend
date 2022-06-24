const express = require("express");
const productService = require("../services/productService");

const router = express.Router();

router.post("/add", async (req, res) => {
  const response = await productService.addProduct(req.body);
  res.status(200);
  res.send(response);
});

module.exports = router;
