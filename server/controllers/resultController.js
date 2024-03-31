const pool = require("../db");

const getAllResults = async (req, res) => {
  try {
    const allResults = await pool.query("select * from result");
    res.json(allResults.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getResultById = async (req, res) => {
    try {
        const { id } = req.params;
        const resultById = await pool.query("select * from result where id=$1", [id]);
        res.json(resultById.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const createResult = async (req, res) => {
    try {
        const { member_id, quiz_id, score } = req.body;
        const createdResult = await pool.query("insert into result(member_id, quiz_id, score) values ($1, $2, $3) returning *", [member_id, quiz_id, score]);
        res.json(createdResult.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const updateResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { member_id, quiz_id, score } = req.body;
        const updatedResult = await pool.query("update result set member_id=$1, quiz_id=$2, score=$3 where id=$4 returning *", [member_id, quiz_id, score, id]);
        res.json(updatedResult.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const deleteResult = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedResult = await pool.query("delete from result where id=$1 returning *", [id]);
        res.json({"message": "item deleted successfully"})
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getAllResults,
    getResultById,
    createResult,
    updateResult,
    deleteResult
};