const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");

router.get("/", quizController.getAllQuizzes);
router.get("/all/:group_id", quizController.getAllQuizzesByGroupId);
router.get('/completed-quiz', quizController.getCompletedQuizzes);
router.get('/get-quiz-info/:id', quizController.getQuizById);

router.post("/", quizController.createQuiz);

router.put("/:id", quizController.updateQuiz);

router.delete("/:id", quizController.deleteQuiz);

module.exports = router;