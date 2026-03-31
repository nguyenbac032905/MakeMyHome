const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/order.controller");
const validate = require("../../validates/client/order.validate");

router.get("/", controller.getListOrder);
router.get("/:orderId", controller.getOrder);
router.post("/",validate.create, controller.create);
router.patch("/:orderId", validate.patch, controller.patch);
router.delete("/:orderId", controller.deleteOrder);
module.exports = router;