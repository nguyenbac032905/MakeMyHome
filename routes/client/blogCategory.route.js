const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/blogCategory.controller");

router.get("/", controller.getListCategory);
router.get("/:categoryId/blogs", controller.getListProductByCategory);

module.exports = router;