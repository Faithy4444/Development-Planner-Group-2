//import { pool } from "../db.js";
import { pool } from "../db/db.js";

//creating
export const createTask = async (req, res) => {
  const { title, goal_id } = req.body;
  const { id: userId } = req.user;
  try {
    const parentGoal = await pool.query(
      "SELECT user_id FROM goals WHERE id = $1",
      [goal_id]
    );
    if (parentGoal.rows.length === 0 || parentGoal.rows[0].user_id !== userId) {
      return res
        .status(403)
        .json({ msg: "Forbidden: You do not own the parent goal." });
    }
    const newTask = await pool.query(
      "INSERT INTO tasks (title, goal_id, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, goal_id, userId]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
  const { id: taskId } = req.params;
  const { title, description, due_date, is_completed } = req.body;
  const { id: userId } = req.user;
  try {
    const updatedTask = await pool.query(
      `
            UPDATE tasks t SET title = $1, is_completed = $2
            FROM goals g
            WHERE t.id = $3 AND t.goal_id = g.id AND g.user_id = $4
            RETURNING t.*;
        `,
      [title, is_completed, taskId, userId]
    );
    if (updatedTask.rows.length === 0) {
      return res
        .status(404)
        .json({ msg: "Task not found or you do not have permission." });
    }
    res.json(updatedTask.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const completeTask = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query(
      `UPDATE tasks 
             SET is_completed = NOT is_completed
             WHERE id = $1
             RETURNING *`,
      [id]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json("ok");
  } catch (err) {
    console.error("updateTask error:", err);
    res.status(500).json({ message: "Server error updating task." });
  }
};

//Deleting task

export const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  const { id: userId } = req.user;
  console.log("user want to delete task under id", id);

  try {
    const result = await pool.query(
      `
            DELETE FROM tasks t
            USING goals g
            WHERE t.id = $1 AND t.goal_id = g.id AND g.user_id = $2;
        `,
      [taskId, userId]
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ msg: "Task not found or you do not have permission." });
    }
    res.json({ msg: "Task deleted successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
