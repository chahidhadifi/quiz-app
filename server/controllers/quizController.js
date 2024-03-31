const pool = require("../db");

const getAllQuizzes = async (req, res) => {
  try {
    const allQuizzes = await pool.query("select * from quiz");
    res.json(allQuizzes.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const quizById = await pool.query("select * from quiz where id=$1", [id]);
        res.json(quizById.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const createQuiz = async (req, res) => {
    try {
        const { title, description, date, time, duration, group_id } = req.body;
        const createdQuiz = await pool.query("insert into quiz(title, description, date, time, duration, group_id) values ($1, $2, $3, $4, $5, $6) returning *", [title, description, date, time, duration, group_id]);
        res.json(createdQuiz.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, time, duration, group_id } = req.body;
        const updatedQuiz = await pool.query("update quiz set title=$1, description=$2, date=$3, time=$4, duration=$5, group_id=$6 where id=$7 returning *", [title, description, date, time, duration, group_id, id]);
        res.json(updatedQuiz.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuiz = await pool.query("delete from quiz where id=$1 returning *", [id]);
        res.json({"message": "item deleted successfully"})
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getAllQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz
};