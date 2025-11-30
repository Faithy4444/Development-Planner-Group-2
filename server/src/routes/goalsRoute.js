import express from "express";
import authMiddleware from '../middleware/auth.js';
import { query as dbQuery } from "../db.js"; // Use the corrected named import

const router = express.Router();

// GET all goals for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  const { id: userId } = req.user;
  try {
    const goalData = await dbQuery(`
      SELECT g.*, COALESCE((SELECT json_agg(t.* ORDER BY t.created_at) FROM tasks t WHERE t.goal_id = g.id), '[]') AS tasks
      FROM goals g
      WHERE g.user_id = $1
      ORDER BY g.created_at DESC;
    `, [userId]);
    res.json(goalData.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new goal for the logged-in user
router.post("/", authMiddleware, async (req, res) => {
  const { specific, measurable, achievable, relevant, time_bound, title } = req.body;
  const { id: userId } = req.user;
  try {
    const newGoal = await dbQuery(
      'INSERT INTO goals (user_id, title, specific, measurable, achievable, relevant, time_bound) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, title, specific, measurable, achievable, relevant, time_bound]
    );
    res.status(201).json(newGoal.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE a goal for the logged-in user
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id: goalId } = req.params;
  const { id: userId } = req.user;
  try {
    const result = await dbQuery('DELETE FROM goals WHERE id = $1 AND user_id = $2', [goalId, userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ msg: 'Goal not found or you do not own this goal.' });
    }
    res.json({ msg: 'Goal deleted successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;