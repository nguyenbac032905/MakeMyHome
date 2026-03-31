const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/productCategory.controller");
const validate = require("../../validates/admin/productCategory.validate");

router.get("/", controller.getListCategory);
router.get("/:categoryId/products", controller.getListProductByCategory);
router.post("/",validate.create, controller.create);
router.patch("/:categoryId", validate.patch, controller.patch);
router.delete("/:categoryId", controller.deleteCategory);

module.exports = router;