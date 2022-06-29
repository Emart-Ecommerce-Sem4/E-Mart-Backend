const express = require("express");
const productService = require("../services/productService");

const router = express.Router();

router.post("/add", async (req, res) => {
  const response = await productService.addProduct(req.body);
  res.status(200);
  res.send(response);
});
router.put("/update/:ID", async (req, res) => {
  const data ={
    productId: req.params.ID,
    ...req.body
  }
  const response = await productService.updateProduct(data);
  res.status(200);
  res.send(response);
});
module.exports = router;
