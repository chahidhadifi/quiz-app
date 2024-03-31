const pool = require("../db");

const getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await pool.query("select * from question");
    res.json(allQuestions.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const questionById = await pool.query("select * from question where id=$1", [id]);
        res.json(questionById.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const createQuestion = async (req, res) => {
    try {
        const { title, option_a, option_b, option_c, option_d, answer, quiz_id } = req.body;
        const createdQuestion = await pool.query("insert into question(title, option_a, option_b, option_c, option_d, answer, quiz_id) values ($1, $2, $3, $4, $5, $6, $7) returning *", [title, option_a, option_b, option_c, option_d, answer, quiz_id]);
        res.json(createdQuestion.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, option_a, option_b, option_c, option_d, answer, quiz_id } = req.body;
        const updatedQuestion = await pool.query("update groups set title=$1, option_a=$2, option_b=$3, option_c=$4, option_d=$5, answer=$6, quiz_id=$7 where id=$8 returning *", [title, option_a, option_b, option_c, option_d, answer, quiz_id, id]);
        res.json(updatedQuestion.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuestion = await pool.query("delete from question where id=$1 returning *", [id]);
        res.json({"message": "item deleted successfully"})
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
};