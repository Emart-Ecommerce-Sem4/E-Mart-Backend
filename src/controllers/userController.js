const express = require("express");
const userService = require("../services/userService");

const router = express.Router();

router.get("/:ID", async (req, res) => {
  const result = await userService.getUserDetails(req.params.ID);
  res.status(200);
  res.send(result);
});

router.post("/signup", async (req, res) => {
  const result = await userService.registerUser(req.body);
  res.send(result);
});

router.post("/signin", async (req, res) => {
  const result = await userService.signin(req.body.email, req.body.password);
  res.send(result);
});

router.get("/reset-password/:email", async (req, res) => {
  const result = await userService.forgotPassword(req.params.email);
  res.status(200);
  res.send(result);
});

module.exports = router;
