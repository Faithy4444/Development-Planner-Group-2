import { pool } from "./db.js";

(async () => {
  try {
    const result = await pool.query('SELECT NOW() AS now');
    console.log('Postgres connected! Timestamp:', result.rows[0].now);
  } catch (err) {
    console.error('Error connecting to Postgres:', err);
  }
})();
