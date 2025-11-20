import { query } from "./db.js";

async function test() {
  const result = await query("SELECT NOW()");
  console.log(result.rows);
}

test();
