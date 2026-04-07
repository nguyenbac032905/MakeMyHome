const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get("/",authMiddleware.auth, controller.getUser);
router.patch("/",validate.patch,authMiddleware.auth, controller.patch);
router.post("/register",validate.register, controller.register);
router.post("/login",validate.login, controller.login);

module.exports = router;