const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");

router.get("/",controller.getCart);
router.post("/", controller.createCart);
router.patch("/add", controller.addProduct);
router.patch("/changeQuantity", controller.changeQuantity);
router.patch("/delete", controller.deleteProduct);
module.exports = router;