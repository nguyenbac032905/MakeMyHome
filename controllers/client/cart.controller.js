const { default: mongoose } = require("mongoose");
const Cart = require("../../models/cart.model");
const User = require("../../models/user.model");

module.exports.getCart = async (req,res) => {
    try{
        const user = req.user;
        const cart = await Cart.findOne({user_id: user._id});
        res.status(200).json(cart)
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.createCart = async (req,res) => {
   try{
        const user = req.user;
        const dataCreate = {
            user_id: user._id,
            products: req.body.products || []
        };
        const cart = new Cart(dataCreate);
        await cart.save();
        res.status(200).json(cart)
   }catch(error){
        res.status(500).json({
            message: "Server error"
        })
   }
}
module.exports.addProduct = async (req,res) => {
    try{
        const user = req.user;
        const product=req.body.product;
        product.product_id = new mongoose.Types.ObjectId(product.product_id);
        const updateResult = await Cart.updateOne({
            user_id: user._id,
            "products.product_id": product.product_id
        },{$inc: {"products.$.quantity": product.quantity}});
        if(updateResult.matchedCount === 0){
            const cart = await Cart.updateOne({user_id: user._id},{$push: {products: product}});
            console.log(cart)
        }
        return res.status(200).json({
            message: "Thêm vào giỏ hàng thành công"
        });
   }catch(error){
        res.status(500).json({
            message: "Server error"
        })
   }
}
module.exports.changeQuantity = async (req,res) => {
    try{
        const user = req.user;
        const product = req.body.product;
        const cart = await Cart.findOneAndUpdate({
            user_id: user._id,
            "products.product_id": product.product_id
        },{
            $set: {"products.$.quantity": product.quantity}
        },{
            new: true
        });
        if (!cart) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm trong giỏ"
            });
        }
        res.status(200).json(cart);
   }catch(error){
        res.status(500).json({
            message: "Server error"
        })
   }
}
module.exports.deleteProduct = async (req,res) => {
    try{
        const user = req.user;
        const productId = req.body.product_id;
        const cart = await Cart.findOneAndUpdate({
            user_id: user._id,
        },{
            $pull: {products: {product_id: productId}}
        },{
            new: true
        });
        if (!cart) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm trong giỏ"
            });
        }
        res.status(200).json(cart);
   }catch(error){
        res.status(500).json({
            message: "Server error"
        })
   }
}