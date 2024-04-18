const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/", usersController.getAllusers);
router.get("/:id", usersController.getUniqueUser);

router.post('/signup', usersController.signUp);
router.post('/login', usersController.logIn);

router.put("/:id", usersController.updateUser);

router.delete("/:id", usersController.deleteUser);

module.exports = router;