const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getSubCategoriesForParentId(parentId) {
  try {
    const res = await pool.query(
      "SELECT * from sub_category s left outer join category_subcategory cs on cs.sub_category_id=s.sub_category_id WHERE category_id = $1",
      [parentId]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

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
      values.sub_category_id,
      values.categoryId,
      values.name,
    ]);
    return true;
  } catch (error) {
    throw InternalServerErrorException();
  }
}

module.exports = {
  addSubCategory,
  getSubCategoryByName,
  getSubCategoriesForParentId,
};
