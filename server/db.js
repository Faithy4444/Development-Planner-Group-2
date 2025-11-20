import 'dotenv/config'; // loads .env
import pg from 'pg';
const { Pool } = pg;

// Make a connection pool using your DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    const result = await pool.query('SELECT NOW() AS now');
    console.log('Postgres connected! Timestamp:', result.rows[0].now);
    await pool.end();
  } catch (err) {
    console.error('Error connecting to Postgres:', err);
  }
}

test();
