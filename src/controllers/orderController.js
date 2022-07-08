const express = require("express");
const orderService = require("../services/orderService");
const authenticateToken = require("../middlewares/authorization");

const router = express.Router();

router.post("/refund", async (req, res) => {
  const result = await orderService.refundOrder(req.body);
  res.status(200);
  res.send(result);
});

router.post("/complete", async (req, res) => {
  const result = await orderService.completeOrder(req.body);
  res.status(200);
  res.send(result);
});

router.post("/reject", async (req, res) => {
  const result = await orderService.rejectOrder(req.body);
  res.status(200);
  res.send(result);
});

router.post("/ship", async (req, res) => {
  const result = await orderService.deliverOrder(req.body);
  res.status(200);
  res.send(result);
});

router.get("/products/:Id", async (req, res) => {
  const result = await orderService.getOrderProducts(req.params.Id);
  res.status(200);
  res.send(result);
});

router.get("/status/:STATUS", async (req, res) => {
  const result = await orderService.getOrdersAccordingToStatus(
    req.params.STATUS
  );
  res.status(200);
  res.send(result);
});

router.post("/add",  async (req, res) => {
  const result = await orderService.addOrder(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
