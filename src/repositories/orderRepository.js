const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getOrderProducts(orderId) {
  try {
    const res = await pool.query(
      "SELECT * from product NATURAL JOIN order_items WHERE order_id = $1",
      [orderId]
    );
    return res;
  } catch (error) {
    throw InternalServerErrorException();
  }
}

async function getOrdersAccordingToStatus(status) {
  try {
    const res = await pool.query(
      "SELECT * from user_orders WHERE order_status=$1",
      [status]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function addOrder(values) {
  try {
    pool.query("BEGIN");
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

    values.products.forEach(async (element) => {
      const res1 = await pool.query(
        "INSERT INTO order_items (order_id,product_id,item_count,total_price) VALUES ($1,$2,$3,$4)",
        [values.id, element.product_id, element.item_count, element.totalPrice]
      );
    });
    await pool.query("COMMIT");
    return true;
  } catch (error) {
    await pool.query("ROLLBACK");

    throw InternalServerErrorException();
  }
}

module.exports = { addOrder, getOrdersAccordingToStatus, getOrderProducts };
