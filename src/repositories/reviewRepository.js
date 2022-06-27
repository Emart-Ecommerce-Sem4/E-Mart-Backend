const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function addReview(values) {
  try {
    const res = await pool.query(
      "INSERT INTO product_review(review_id,user_id,product_id,rating,description) VALUES ($1,$2,$3,$4,$5)",
      [
        values.id,
        values.userId,
        values.productId,
        values.rating,
        values.description,
      ]
    );
    return true;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

module.exports = { addReview };
