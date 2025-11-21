import pg from "pg";
import "dotenv/config";
const { Pool } = pg;


const pool = new Pool({
     host: process.env.PGHOST,
     user: process.env.PGUSER,
     password: process.env.PGPASSWORD,
     database: process.env.PGDATABASE,
     port: process.env.PGPORT,
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL!"))
    .catch(err => console.error("Connection error:", err));

export { pool };

export async function query(text, params) {
    return pool.query(text, params)
};


