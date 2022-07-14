const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getVarientsForProduct(productId) {
  try {
    const res = await pool.query(
      "SELECT * FROM variant WHERE product_id = $1",
      [productId]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function getVaraintByType(type) {
  try {
    const res = await pool.query(
      "SELECT * FROM variant WHERE variant_type = $1",
      [type]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
async function getVaraintById(ID) {
  try {
    const res = await pool.query(
      "SELECT * FROM variant WHERE variant_id = $1",
      [ID]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
async function addVariant(values) {
  try {
    const res = await pool.query(
      "INSERT INTO variant VALUES ($1,$2,$3,$4,$5,$6)",
      [
        values.variantId,
        values.productId,
        values.description,
        values.variantType,
        values.qunatityInStock,
        values.unitPrice,
      ]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
async function updateVariant(values) {
  try {
    const res = await pool.query(
      "UPDATE variant SET variant_type = $1,description = $2, quantity_in_stock = $3,unit_price = $4 WHERE variant_id=$5",
      [
        values.variantType,
        values.description,
        values.quantityInStock,
        values.unitPrice,
        values.variantId,
      ]
    );
    const resUpdate = await pool.query("SELECT * FROM check_orders($1)", [
      values.variantId,
    ]);
    return true;
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException();
  }
}

module.exports = {
  addVariant,
  getVaraintByType,
  getVaraintById,
  updateVariant,
  getVarientsForProduct,
};
