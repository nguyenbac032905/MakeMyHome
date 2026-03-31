const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/productCategory.controller");

router.get("/", controller.getListCategory);
router.get("/:slugCategory/products", controller.getListProductByCategory);

module.exports = router;