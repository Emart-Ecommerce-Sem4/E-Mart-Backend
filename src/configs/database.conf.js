const { Pool } = require("pg");

const pool = new Pool({
  user: "database_user",
  database: "dbms",
  password: "password@123",
  port: 5432,
  host: "localhost",
});

module.exports = pool;
