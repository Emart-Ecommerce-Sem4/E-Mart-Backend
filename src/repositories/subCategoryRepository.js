const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getSubCategoryByName(name) {
  try {
    const res = await pool.query("SELECT * from sub_category WHERE name = $1", [
      name,
    ]);
    return res;
  } catch (error) {
    throw InternalServerErrorException();
  }
}

async function addSubCategory(values) {
  try {
    const res = await pool.query("INSERT INTO sub_category VALUES ($1,$2,$3)", [
      values.id,
      values.categoryId,
      values.name,
    ]);
    return true;
  } catch (error) {
    throw InternalServerErrorException();
  }
}

module.exports = { addSubCategory, getSubCategoryByName };
