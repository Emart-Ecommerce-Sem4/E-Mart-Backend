const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getProductsForSubCategory(subCategoryId) {
  try {
    const res = await pool.query(
      "SELECT * from product WHERE product_id IN (SELECT DISTINCT product_id FROM product_subcategory WHERE sub_category_id = $1)",
      [subCategoryId]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function getProductsForCategory(categoryId) {
  try {
    const res = await pool.query(
      "SELECT * from product WHERE product_id IN (SELECT DISTINCT product_id from product_subCategory WHERE sub_category_id IN (SELECT sub_category_id from category_subcategory WHERE category_id = $1))",
      [categoryId]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

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
    await pool.query("BEGIN");
    const res = await pool.query("INSERT INTO product VALUES ($1,$2,$3,$4)", [
      values.id,
      values.title,
      values.weight,
      values.sku,
    ]);
    for (image of values.images) {
      const res3 = await pool.query(
        "INSERT INTO product_images VALUES ($1,$2)",
        [values.id, image]
      );
    }
    for (category of values.subCategories) {
      const res2 = await pool.query(
        "INSERT INTO product_subcategory VALUES ($1,$2)",
        [values.id, category]
      );
    }
    await pool.query("COMMIT");
  } catch (error) {
    await pool.query("ROLLBACK");
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
  getProductsForCategory,
  getProductsForSubCategory,
};
