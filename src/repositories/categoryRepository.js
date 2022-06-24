const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getAllCategories() {
  try {
    const res = await pool.query("SELECT * FROM category");
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function getCategoryById(id) {
  try {
    const res = await pool.query(
      "SELECT * from category WHERE category_id = $1",
      [id]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function getCategoryByName(name) {
  try {
    const res = await pool.query(
      "SELECT * from category WHERE category_name = $1",
      [name]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function addCategory(values) {
  try {
    const res = await pool.query(
      "INSERT INTO category (category_id,category_name) VALUES ($1,$2)",
      [values.categoryId, values.categoryName]
    );

    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function deleteCategory(id) {
  try {
    const res = await pool.query(
      "DELETE FROM category WHERE category_id = $1",
      [id]
    );

    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

module.exports = {
  addCategory,
  getCategoryByName,
  getCategoryById,
  getAllCategories,
  deleteCategory,
};
