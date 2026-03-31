const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/blogCategory.controller");
const validate = require("../../validates/admin/blogCategory.validate");

router.get("/", controller.getListCategory);
router.get("/:categoryId/blogs", controller.getListProductByCategory);
router.post("/",validate.create, controller.create);
router.patch("/:categoryId", validate.patch, controller.patch);
router.delete("/:categoryId", controller.deleteCategory);

module.exports = router;