const express = require("express");
const router = express.Router();

const likeController = require("../controllers/like_controller");
const passport = require("passport");

router.post("/toggle", passport.checkAuthentication, likeController.toggleLike);

module.exports = router;
