const express = require("express");

const router = express.Router();

router.get("/signin", (req, res) => {
  console.log(req);
  res.statusCode(200);
  res.send();
});

module.exports = router;
