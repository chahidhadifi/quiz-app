const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");

router.get("/", questionController.getAllQuestions);
router.get("/get-question-by-quiz-id/:id", questionController.getQuestionByQuizId);
router.post("/add-new-question/:id", questionController.createQuestion);
router.put("/edit-question/:id", questionController.updateQuestion);
router.delete("/delete-question/:id", questionController.deleteQuestion);

module.exports = router;