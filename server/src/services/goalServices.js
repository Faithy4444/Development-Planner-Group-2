import { pool } from "../db.js";

export const getAllActiveGoals = async () => {
  const res = await pool.query("SELECT * FROM goals WHERE is_complete = false");
  return res.rows;
};

export const findGoalById = async (id) => {
  const res = await pool.query("SELECT * FROM goals WHERE id = $1", [id]);
  return res.rows[0];
};

export const markGoalComplete = async (id) => {
  await pool.query("UPDATE goals SET is_complete = true WHERE id = $1", [id]);
};