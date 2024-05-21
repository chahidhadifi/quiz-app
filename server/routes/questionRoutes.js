const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");

router.get("/", questionController.getAllQuestions);
router.get("/get-question-by-quiz-id/:id", questionController.getQuestionByQuizId);
router.post("/add-new-question/:id", questionController.createQuestion);
router.put("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;