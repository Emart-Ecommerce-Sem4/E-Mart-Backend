const express = require("express");
const productService = require("../services/productService");
const authenticateToken = require("../middlewares/authorization");

const router = express.Router();

router.get("/subcategory/:id", async (req, res) => {
  const response = await productService.getProductsForSubCategory(
    req.params.id
  );
  res.status(200);
  res.send(response);
});

router.get("/category/:id", async (req, res) => {
  const response = await productService.getProductsForCategory(req.params.id);
  res.status(200);
  res.send(response);
});

router.get("/images/:id", async (req, res) => {
  const response = await productService.getProductImages(req.params.id);
  res.status(200);
  res.send(response);
});

router.get("/get/:id", async (req, res) => {
  const response = await productService.getProduct(req.params.id);
  res.status(200);
  res.send(response);
});

router.get("/all", async (req, res) => {
  const response = await productService.getAllProducts();
  res.status(200);
  res.send(response);
});

router.post("/add", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const response = await productService.addProduct(req.body);
  res.status(200);
  res.send(response);
});
router.put("/update/:ID", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const data = {
    productId: req.params.ID,
    ...req.body,
  };
  const response = await productService.updateProduct(data);
  res.status(200);
  res.send(response);
});
module.exports = router;
