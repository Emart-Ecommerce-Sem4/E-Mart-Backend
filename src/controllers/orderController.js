const express = require("express");
const orderService = require("../services/orderService");
const authenticateToken = require("../middlewares/authorization");

const router = express.Router();

router.post("/refund", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const result = await orderService.refundOrder(req.body);
  res.status(200);
  res.send(result);
});

router.post("/complete", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const result = await orderService.completeOrder(req.body);
  res.status(200);
  res.send(result);
});

router.post("/reject", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const result = await orderService.rejectOrder(req.body);
  res.status(200);
  res.send(result);
});

router.post("/ship", authenticateToken, async (req, res) => {
  if (req.user.user_role !== "ADMIN") {
    res.sendStatus(403);
  }
  const result = await orderService.deliverOrder(req.body);
  res.status(200);
  res.send(result);
});

router.get("/products/:Id", authenticateToken, async (req, res) => {
  const result = await orderService.getOrderProducts(req.params.Id);
  res.status(200);
  res.send(result);
});

router.get("/status/:STATUS", authenticateToken, async (req, res) => {
  const result = await orderService.getOrdersAccordingToStatus(
    req.params.STATUS
  );
  res.status(200);
  res.send(result);
});

router.post("/add", authenticateToken, async (req, res) => {
  const result = await orderService.addOrder(req.body);
  res.status(200);
  res.send(result);
});

module.exports = router;
