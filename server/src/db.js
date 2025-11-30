// import pg from "pg";
// import "dotenv/config";
// // We have REMOVED the "require('pg')" line.

// const pool = new pg.Pool({ // <-- We now use pg.Pool
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   port: process.env.DATABASE_PORT,
// });

// pool
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL!"))
//   .catch((err) => console.error("Connection error:", err));

// export { pool };

// export async function query(text, params) {
//   return pool.query(text, params);
// }

// server/src/db.js

import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

// This is the CRITICAL FIX.
// We are now telling the Pool to get ALL of its connection info
// from the single DATABASE_URL variable, which you have correctly
// defined in your .env file.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// This simple query is a better way to check the connection.
// It will run when your server starts.
pool.query('SELECT NOW()')
  .then(() => console.log("✅ Database connection successful!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Your exports are almost perfect, but exporting only the query function
// is a slightly cleaner pattern for the rest of your app.
export const query = (text, params) => pool.query(text, params);