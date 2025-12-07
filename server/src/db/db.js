import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .query("SELECT NOW()")
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((err) => console.error("Connection error:", err));

export { pool };

//just neater import
export const query = (text, params) => pool.query(text, params);
