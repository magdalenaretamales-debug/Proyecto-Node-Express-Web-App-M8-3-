const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

pool.on("connect", () => {
  console.log("✅ Conexión exitosa a PostgreSQL");
});

pool.on("error", (error) => {
  console.error("❌ Error en el pool de PostgreSQL:", error.message);
});

module.exports = pool;