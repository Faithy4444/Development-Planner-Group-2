import pg from "pg";
import "dotenv/config";
const { Pool } = pg;
export { pool };

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


export async function query(text, params) {
    return pool.query(text, params)
};


