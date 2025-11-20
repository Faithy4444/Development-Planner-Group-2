import { query } from "./db.js";

async function test() {
  try {
    const result = await query('SELECT NOW() AS now');
    console.log('Postgres connected! Timestamp:', result.rows[0].now);
  } catch (err) {
    console.error('Error connecting to Postgres:', err);
  }
}

test();
