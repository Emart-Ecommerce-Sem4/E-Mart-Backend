require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./src/controllers/userController");
const categoryController = require("./src/controllers/categoryController");
const productController = require("./src/controllers/productController");
const variantController = require("./src/controllers/variantController");
const reviewController = require("./src/controllers/reviewController");

const pool = require("./src/configs/database.conf");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userController);
app.use("/api/category", categoryController);
app.use("/api/product", productController);
app.use("/api/variant", variantController);
app.use("/api/review", reviewController);

app.listen(process.env.PORT, () => {
  pool.connect().then((res) => {
    console.log("Database connected");
  });
  console.log("Server started sucessfully!");
});
