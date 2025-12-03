import { pool } from "../db/db.js";

//creating

export const createTask = async (req, res) => {
  const { user_id, goal_id, title, description, due_date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tasks (user_id, goal_id, title, description, due_date)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [user_id, goal_id, title, description, due_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//Get all tasks for a user

export const getAllTasks = async (req, res) => {
  const { user_id } = req.params;

  try {
    const results = await pool.query(
      `SELECT * FROM tasks 
            WHERE use_id = $1
            ORDER BY due_date ASC`,
      [user_id]
    );
    res.status(200).json(results.rows);
  } catch (err) {
    console.error("getAllTasks error:", err);
    res.status(500).json({ message: "Server error fetching tasks." });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const results = await pool.query(`SELECT * FROM tasks WHERE ID = $1`, [id]);
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }
  } catch (err) {
    console.error("getTaskById error:", err);
    res.status(500).json({ message: "Server error fetching task." });
  }
};

//update tasks

export const updateTasks = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, is_completed } = req.body;
  console.log(req.body);
  try {
    const results = await pool.query(
      `UPDATE tasks 
             SET title = COALESCE($1, title),
                 description = COALESCE($2, description),
                 due_date = COALESCE($3, due_date),
                 is_completed = COALESCE($4, is_completed)
             WHERE id = $5
             RETURNING *`,
      [title, description, due_date, is_completed, id]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.error("updateTask error:", err);
    res.status(500).json({ message: "Server error updating task." });
  }
};

export const completeTask = async (req, res) => {
  const { id } = req.params;
};

//Deleting task

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log("user want to delete task under id", id);
  try {
    const result = await pool.query(
      `DELETE FROM tasks WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    console.error("deleteTask error:", err);
    res.status(500).json({ message: "Server error deleting task." });
  }
};
