const express = require("express");
const userService = require("../services/userService");

const router = express.Router();

router.get("/signin", (req, res) => {
  userService.registerUser("Values");
  res.send();
});

module.exports = router;
