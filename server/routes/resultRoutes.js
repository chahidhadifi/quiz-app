const express = require("express");
const router = express.Router();

const resultController = require("../controllers/resultController");

router.post("/", resultController.createResult);
router.post("/check-result", resultController.checkResult);

module.exports = router;