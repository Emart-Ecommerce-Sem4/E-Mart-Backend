const express = require("express");
const userService = require("../services/userService");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const result = await userService.registerUser(req.body);
  res.send(result);
});

router.post("/signin", async (req, res) => {
  const result = await userService.signin(req.body.email,req.body.password);
  res.send(result);
});

module.exports = router;
