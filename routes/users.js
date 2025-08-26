const express = require("express");
const userController = require("../controllers/users_controller.js");

const router = express.Router();

router.get("/profile", userController.profile);

module.exports = router;