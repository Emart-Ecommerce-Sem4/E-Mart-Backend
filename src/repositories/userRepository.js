const pool = require("../configs/database.conf");

async function getUser(email) {
  try {
    const res = await pool.query("SELECT * FROM  user_account   WHERE email = $1", [
      email
    ]);
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function registerUser(user) {
  const { user_id, first_name, last_name, password, birthday,phone_number,address,city,email } = user;
  try {
  
    await pool.query('BEGIN')

    const res_user_acc = await pool.query(
      "INSERT INTO user_account (user_id,email,password,user_role) values ($1,$2,$3,$4)",
      [user_id, email,password,'customer']
    );
    const res_cusromer = await pool.query(
      "INSERT INTO customer (user_id,first_name,last_name,birthday,phone_number,address,city) values ($1,$2,$3,$4,$5,$6,$7)",
      [user_id, first_name, last_name, birthday, phone_number,address,city]
    );
    
    await pool.query('COMMIT')
   
  } catch (error) {
    console.log(error)
    await pool.query('ROLLBACK')
    throw new InternalServerErrorException();
  }
}

module.exports = { registerUser, getUser };
