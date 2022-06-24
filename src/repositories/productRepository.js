const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

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

module.exports = { addProduct };
