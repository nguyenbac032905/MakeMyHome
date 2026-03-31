const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller");

router.get("/", controller.getListProduct);
router.get("/:slugProduct", controller.getProduct);

module.exports = router;