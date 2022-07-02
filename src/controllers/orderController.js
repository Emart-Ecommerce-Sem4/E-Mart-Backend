const express = require("express");
const orderService = require("../services/orderService");

const router = express.Router();

router.post("/add", async (req, res) => {
  const result = await orderService.addOrder(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
