const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function addOrder(values) {
  try {
    const res = await pool.query(
      "INSERT INTO user_orders (order_id,user_id,order_date,item_count,order_status,comments,payment_method,total_price) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        values.id,
        values.userId,
        values.orderDate,
        values.itemCount,
        values.orderStatus,
        values.comments,
        values.paymentMethod,
        values.totalPrice,
      ]
    );
    return true;
  } catch (error) {
    console.log(error);
    throw InternalServerErrorException();
  }
}

module.exports = { addOrder };
