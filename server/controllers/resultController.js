const pool = require("../db");

const createResult = async (req, res) => {
    try {
        const { member_id, quiz_id, score } = req.body;
        if (member_id == null || quiz_id == null || score == null) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const upsertResult = await pool.query(
            `INSERT INTO result (member_id, quiz_id, score)
             VALUES ($1, $2, $3)
             ON CONFLICT (member_id, quiz_id)
             DO UPDATE SET score = EXCLUDED.score
             RETURNING *`,
            [member_id, quiz_id, score]
        );

        res.json(upsertResult.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const checkResult = async (req, res) => {
    try {
        const { member_id, quiz_id } = req.body;
        const result = await pool.query(
            `SELECT * FROM result WHERE member_id = $1 AND quiz_id = $2`,
            [member_id, quiz_id]
        );

        if (result.rows.length > 0) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    createResult,
    checkResult
};