const express = require("express");
const userController = require("../controllers/users_controller.js");
const passport = require("passport");

const router = express.Router();

router.get("/profile/:id",passport.checkAuthentication, userController.profile);
router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);
router.post("/update/:id",passport.checkAuthentication, userController.update);

router.post("/create", userController.create);
router.post("/create-session", passport.authenticate("local", {failureRedirect: "/users/sign-in"}), userController.createSession);
router.get("/sign-out", userController.destroySession);

module.exports = router;