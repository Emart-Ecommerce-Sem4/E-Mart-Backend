require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userController = require("./src/controllers/userController");
const categoryController = require("./src/controllers/categoryController");
const productController = require("./src/controllers/productController");
const variantController = require("./src/controllers/variantController");
const reviewController = require("./src/controllers/reviewController");
const orderController = require("./src/controllers/orderController");
const subCategoryController = require("./src/controllers/subCategoryController");
const reportController = require("./src/controllers/reportController");


const pool = require("./src/configs/database.conf");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userController);
app.use("/api/category", categoryController);
app.use("/api/product", productController);
app.use("/api/variant", variantController);
app.use("/api/review", reviewController);
app.use("/api/order", orderController);
app.use("/api/subcategory", subCategoryController);
app.use("/api/report", reportController);



app.listen(process.env.PORT, () => {
  pool.connect().then((res) => {
    console.log("Database connected");
  });
  console.log("Server started sucessfully!");
});
