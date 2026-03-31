const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/blog.controller");
const validate = require("../../validates/admin/blog.validate");

router.get("/", controller.getListBlog);
router.get("/:blogId", controller.getBlog);
router.post("/",validate.create, controller.create);
router.patch("/:blogId",validate.patch, controller.patch);
router.delete("/:blogId", controller.deleteBlog);

module.exports = router;