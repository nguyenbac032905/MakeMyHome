const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/order.controller");

router.get("/", controller.getListOrder);
router.get("/:orderId", controller.getOrder);
router.delete("/:orderId", controller.deleteOrder);

module.exports = router;