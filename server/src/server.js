import express from "express";
import cors from "cors";
import "dotenv/config";
import { pool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middleware accepts all endpoints for now
app.use(cors());
app.use(express.json());

//Temp root endpoint for testing
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.send(`the database name is ${result.rows[0].current_database}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
