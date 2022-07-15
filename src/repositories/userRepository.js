const pool = require("../configs/database.conf");

async function getCustomerDetails(customerId) {
  try {
    const res = await pool.query("SELECT * from customer WHERE user_id = $1", [
      customerId,
    ]);
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function getUser(email) {
  try {
    const res = await pool.query(
      "SELECT * FROM  user_account   WHERE email = $1",
      [email]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function getUserOrders(userId) {
  try {
    const res = await pool.query(
      "SELECT * FROM  full_product_order_view   WHERE user_id = $1 order by order_date desc",
      [userId]
    );
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
async function registerUser(user) {
  const {
    user_id,
    firstName,
    lastName,
    password,
    birthday,
    phoneNumber,
    addressLine1,
    addressLine2,
    postalCode,
    district,
    city,
    email,
  } = user;
  try {
    await pool.query("BEGIN");
    const res_user_acc = await pool.query(
      "INSERT INTO user_account (user_id,email,password,user_role) values ($1,$2,$3,$4)",
      [user_id, email, password, "CUSTOMER"]
    );
    const res_cusromer = await pool.query(
      "INSERT INTO customer (user_id,first_name,last_name,birthday,phone_number,address_line_1,address_line_2,postal_code,district,city) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        user_id,
        firstName,
        lastName,
        birthday,
        phoneNumber,
        addressLine1,
        addressLine2,
        postalCode,
        district,
        city,
      ]
    );

    await pool.query("COMMIT");
  } catch (error) {
    console.log(error);
    await pool.query("ROLLBACK");
    throw new InternalServerErrorException();
  }
}

module.exports = { getUserOrders,registerUser, getUser, getCustomerDetails };
