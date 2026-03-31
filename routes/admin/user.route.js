const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/user.controller");
const validate = require("../../validates/admin/user.validate");

router.get("/", controller.getListUser);
router.get("/:userId", controller.getUser);
router.patch("/:userId",validate.patch, controller.patch);
router.post("/register",validate.register, controller.register);
router.post("/login",validate.login, controller.login);
router.delete("/:userId", controller.deleteUser);

module.exports = router;