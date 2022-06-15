const pool = require("../configs/database.conf");

async function getUser(email) {
  try {
    const res = await pool.query("SELECT * from users WHERE email = $1", [
      email,
    ]);
    return res;
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

async function registerUser(user) {
  const { id, name, email, password, userType } = user;
  try {
    const res = await pool.query(
      "INSERT INTO users (id,name,email,password,userType) values ($1,$2,$3,$4,$5)",
      [id, name, email, password, userType]
    );
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

module.exports = { registerUser, getUser };
