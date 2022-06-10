require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./src/controllers/logController");
const pool = require("./src/configs/database.conf");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use("/api/user/", userController);

app.listen(process.env.PORT, () => {
  pool.connect().then((res) => {
    console.log("Database connected");
  });
  console.log("Server started sucessfully!");
});
