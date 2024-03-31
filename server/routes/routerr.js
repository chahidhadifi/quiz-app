const express = require("express");
const router = express.Router();

const userssController = require("./crud");

router.get("/",userssController.getAllusers );
router.get("/:id", userssController.getUniqueUser);
router.post("/", userssController.InsertUser);
router.put("/:id",userssController.updateUser);

router.delete("/:id", userssController.Delete);

module.exports = router;