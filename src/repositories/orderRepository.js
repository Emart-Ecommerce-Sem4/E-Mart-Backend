const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function refundOrder(values) {
  try {
    const res = await pool.query(
      "UPDATE user_orders SET order_status = $1 WHERE order_id = $2",
      ["REFUNDED", values.orderId]
    );
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function completeOrder(values) {
  try {
    const res = await pool.query(
      "UPDATE user_orders SET order_status = $1 WHERE order_id = $2",
      ["DELIVERED", values.orderId]
    );
    return true;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function rejectOrder(values) {
  // Here order rejection comment also needed to be added
  try {
    const res = await pool.query(
      "UPDATE user_orders SET order_status = $1 WHERE order_id= $2",
      ["REJECTED", values.orderId]
    );
    return true;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function shipOrder(values) {
  try {
    const res = await pool.query(
      "UPDATE user_orders SET order_status = $1,dispatched_date = $2, delivery_id = $3 WHERE order_id = $4",
      ["SHIPPED", values.dispatchedDate, values.deliverId, values.orderId]
    );
    return true;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

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
    console.log( values.orderDate,
      values.itemCount,
      values.deliveryMethod);
    await pool.query("BEGIN");
    
    const res1 = await pool.query(
      "INSERT INTO user_orders (order_id,user_id,variant_id,order_date,item_count,delivery_method,order_status,comments,payment_method,total_price) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        values.id,
        values.userId,
        values.variantId,
        values.orderDate,
        values.itemCount,
        values.deliveryMethod,
        values.orderStatus,
        values.comments,
        values.paymentMethod,
        values.totalPrice,
      ]
    );

    const res2 = await pool.query(
      "UPDATE variant SET quantity_in_stock = quantity_in_stock - $1 WHERE variant_id = $2",
      [values.itemCount, values.variantId]
    );
    await pool.query("COMMIT");
  } catch (error) {
    console.log(error);
    await pool.query("ROLLBACK");
    throw InternalServerErrorException();
  }
}

module.exports = {
  addOrder,
  getOrdersAccordingToStatus,
  getOrderProducts,
  shipOrder,
  rejectOrder,
  completeOrder,
  refundOrder,
};
