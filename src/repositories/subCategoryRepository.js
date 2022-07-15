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
    const res = await pool.query(
      "SELECT * from category_subcategory WHERE name = $1",
      [name]
    );
    return res;
  } catch (error) {
    throw InternalServerErrorException();
  }
}

async function addSubCategory(values) {
  try {
    await pool.query("BEGIN");
    const res1 = await pool.query("INSERT INTO sub_category VALUES ($1,$2)", [
      values.sub_category_id,
      values.name,
    ]);
    const res2 = await pool.query(
      "INSERT INTO category_subcategory VALUES ($1,$2)",
      [values.categoryId, values.sub_category_id]
    );

    await pool.query("COMMIT");
    return true;
  } catch (error) {
    await pool.query("ROLLBACK");
    console.log(error);
    throw InternalServerErrorException();
  }
}

module.exports = {
  addSubCategory,
  getSubCategoryByName,
  getSubCategoriesForParentId,
};
