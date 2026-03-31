const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/blog.controller");

router.get("/", controller.getListBlog);
router.get("/:blogSlug", controller.getBlog);

module.exports = router;