const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

router.get("/", controller.getListProduct);
router.get("/:productId", controller.getProduct);
router.post("/",validate.create, controller.create);
router.patch("/:productId",validate.patch, controller.patch);
router.delete("/:productId", controller.deleteProduct);

module.exports = router;