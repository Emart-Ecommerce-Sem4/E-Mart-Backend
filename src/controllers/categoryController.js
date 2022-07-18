const express = require("express");
const categoryService = require("../services/categoryService");
const authenticateToken = require("../middlewares/authorization");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await categoryService.getAllCategories();
  res.status(200);
  res.send(result);
});

router.get("/get/:ID", async (req, res) => {
  const result = await categoryService.getCategory(req.params.ID);
  res.status(200);
  res.send(result);
});

router.post("/add", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const result = await categoryService.addCategory(req.body);
  res.status(200);
  res.send(result);
});

router.put("/update/:ID", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const data = {
    categoryId: req.params.ID,
    categoryName: req.body.categoryName,
  };
  const result = await categoryService.updateCategory(data);
  res.status(200);
  res.send(result);
});

router.delete("/:ID", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const result = await categoryService.deleteCategory(req.params.ID);
  res.status(200);
  res.send(result);
});

module.exports = router;
