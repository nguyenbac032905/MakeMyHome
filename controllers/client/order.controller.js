const Product = require("../../models/product.model");
const User = require("../../models/user.model");
const Order = require("../../models/order.model");

module.exports.getListOrder = async (req,res) => {
    try{
        const authHeaders = req.headers.authorization;
        if(!authHeaders){
            return res.status(401).json({
                message: "Vui lòng đăng nhập"
            })
        }
        const tokenUser = authHeaders.split(" ")[1];
        const user = await User.findOne({tokenUser: tokenUser,deleted: false, status: "active"});
        if(!user){
            return res.status(401).json({
                message: "Người dùng không tồn tại"
            })
        }

        const order = await Order.find({user_id: user._id, deleted: false}).populate("products.product_id","title images");
        if(!order){
            return res.status(404).json({
                message: "Đơn hàng không tồn tại"
            })
        }
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.getOrder = async (req,res) => {
    try{
        const user = req.user;

        const orderId = req.params.orderId;
        const order = await Order.findOne({_id: orderId,user_id: user._id, deleted: false}).populate("products.product_id","title images");
        if(!order){
            return res.status(404).json({
                message: "Đơn hàng không tồn tại"
            })
        }
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.create = async (req,res) => {
    try{
        const user = req.user;
        
        const products = req.body.products;
        const productIds = products.map(item => item.product_id);
        const productInfo = await Product.find({
            _id: {$in: productIds},
            deleted: false,
            status: "active"
        }).select("price discountPercentage");
        const productMap = {};
        productInfo.forEach(item => productMap[item._id] = item);
        products.forEach(item => {
            item.price = productMap[item.product_id].price;
            item.discountPercentage = productMap[item.product_id].discountPercentage;
        })

        const dataOrder = {
            user_id: user._id,
            userInfo: {
                fullName: req.body.fullName,
                phone: req.body.phone,
                address: req.body.address
            },
            products: products
        };
        const order = new Order(dataOrder);
        await order.save();
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.patch = async (req,res) => {
    try{
        const user = req.user;
        
        const orderId = req.params.orderId;
        const allowedFields = ["fullName","phone","address"]; 
        const dataUpdate = {};
        allowedFields.forEach(item => {
            if(req.body[item] !== undefined){
                dataUpdate[`userInfo.${item}`] = req.body[item];
            }
        })
        const order = await Order.findOneAndUpdate({_id: orderId, user_id: user._id},{$set: dataUpdate},{new: true});
        if(!order){
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng"
            })
        }
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}
module.exports.deleteOrder = async (req,res) => {
    try{
        const user = req.user;
        
        const orderId = req.params.orderId;

        const order = await Order.findOneAndUpdate({_id: orderId, user_id: user._id},{$set: {deleted: true}},{new: true});
        if(!order){
            return res.status(404).json({
                message: "Không tìm thấy đơn hàng"
            })
        }
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}