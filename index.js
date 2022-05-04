const express = require("express");
const pool = require("./src/configs/database.conf");

const app = express();

app.listen(process.env.PORT || 8000, () => {
  pool.connect().then((res) => {
    console.log("Database connected: ", res);
  });
  console.log("Server started sucessfully!");
});
