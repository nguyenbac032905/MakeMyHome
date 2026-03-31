const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/admin.controller");
const validate = require("../../validates/admin/admin.validate");

router.get("/", controller.getListAdmin);
router.get("/:adminId", controller.getAdmin);
router.patch("/:adminId",validate.patch, controller.patch);
router.post("/register",validate.register, controller.register);
router.post("/login",validate.login, controller.login);
router.delete("/:adminId", controller.deleteAdmin);

module.exports = router;