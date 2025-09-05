const express = require("express");
const homeController = require("../controllers/home_controller.js");

const router = express.Router();

router.get("/", homeController.home);
router.use("/users", require("./users.js"));
router.use("/posts", require("./posts.js"));
router.use("/comments", require("./comments.js"));

module.exports = router;