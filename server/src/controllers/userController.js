import { pool } from "../db.js";

export const getFullUserData = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `SELECT 
         u.id AS user_id, u.username, u.email,
         g.id AS goal_id, g.title AS goal_title, g.specific, g.measurable, g.achievable, g.relevant, g.time_bound,
         t.id AS task_id, t.title AS task_title, t.description AS task_description, t.due_date
       FROM users u
       LEFT JOIN goals g ON g.user_id = u.id
       LEFT JOIN tasks t ON t.goal_id = g.id
       WHERE u.id = $1
       ORDER BY g.id, t.id`,
            [id]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });
        const user = {
            user_id: result.rows[0].user_id,
            username: result.rows[0].username,
            email: result.rows[0].email,
            goals: []

        };
        const goalMap = {};
        result.rows.forEach(row => {
            if (row.goal_id && !goalMap[row.goal_id]) {
                goalMap[row.goal_id] = {
                    goal_id: row.goal_id,
                    title: row.goal_title,
                    specific: row.specific,
                    measurable: row.measurable,
                    achievable: row.achievable,
                    relevant: row.relevant,
                    time_bound: row.time_bound,
                    tasks: []
                };
                user.goals.push(goalMap[row.goal_id]);
            }

            if (row.task_id) {
                goalMap[row.goal_id].tasks.push({
                    task_id: row.task_id,
                    title: row.task_title,
                    description: row.task_description,
                    due_date: row.due_date
                });
            }
        });

        res.json(user);


    } catch {
        console.error(err);
        res.status(500).send("Server error");
    };
};