const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getImagesForProduct(productId) {
  try {
    const res = await pool.query(
      "SELECT * from product_images WHERE product_id = $1",
      [productId]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function getAllProducts() {
  try {
    const res = await pool.query("SELECT * from product");
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function addProduct(values) {
  try {
    const res = await pool.query(
      "INSERT INTO product(product_id,name,description,category_id,quantity_in_stock,unit_price,variant_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        values.id,
        values.name,
        values.description,
        values.categoryId,
        values.quantityInStock,
        values.unitPrice,
        values.variantId,
      ]
    );
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException();
  }
}
async function updateProduct(values) {
  try {
    console.log(values);
    const res = await pool.query(
      "UPDATE  product SET name=$1,description=$2,category_id=$3,quantity_in_stock=$4,unit_price=$5,variant_id=$6 where product_id=$7",
      [
        values.name,
        values.description,
        values.categoryId,
        values.quantityInStock,
        values.unitPrice,
        values.variantId,
        values.productId,
      ]
    );
  } catch (error) {
    // console.log(error);
    throw new InternalServerErrorException();
  }
}
async function getProductById(id) {
  try {
    const res = await pool.query("SELECT * FROM product where product_id=$1", [
      id,
    ]);
    return res;
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException();
  }
}
module.exports = {
  addProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  getImagesForProduct,
};
